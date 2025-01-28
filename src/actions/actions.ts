"use server";

import { auth, signIn, signOut } from "@/lib/auth-no-edge";
import prisma from "@/lib/db";
import {
  authSchema,
  petFormSchema,
  petIdSchema,
  userProfileSchema,
} from "@/lib/validations";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { checkAuth, getPetById } from "@/lib/server-utils";
import { Prisma } from "@prisma/client";
import { AuthError } from "next-auth";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// --- user actions ---

export async function logIn(prevState: unknown, formData: unknown) {
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data.",
    };
  }

  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return {
            message: "Invalid credentials.",
          };
        }
        default: {
          return {
            message: "Error. Could not sign in.",
          };
        }
      }
    }

    throw error; // nextjs redirects throws error, so we need to rethrow it
  }
}

export async function signUp(prevState: unknown, formData: unknown) {
  // check if formData is a FormData type
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data.",
    };
  }

  // convert formData to a plain object
  const formDataEntries = Object.fromEntries(formData.entries());

  // validation
  const validatedFormData = authSchema.safeParse(formDataEntries);
  if (!validatedFormData.success) {
    return {
      message: "Invalid form data.",
    };
  }

  const { email, password } = validatedFormData.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          message: "Email already exists.",
        };
      }
    }

    return {
      message: "Could not create user.",
    };
  }

  await signIn("credentials", formData);
}

export async function logOut() {
  await signOut({ redirectTo: "/" });
}

// -- profile actions

export async function updateProfile(ProfileFormData: unknown) {
  // Check session
  const session = await checkAuth();
  if (!session) {
    return { message: "Not authenticated." };
  }

  // Ensure ProfileFormData is FormData
  if (!(ProfileFormData instanceof FormData)) {
    console.log("Not a FormData instance");
    return { message: "Invalid form data." };
  }

  // Get all images first (in case of multiple "images[]" fields)
  const imageUuids = ProfileFormData.getAll("instanceImages[]") as string[];

  // Convert FormData to a plain object
  const formDataObj = Object.fromEntries(ProfileFormData.entries());

  // Validate against Zod schema
  const validatedFormData = userProfileSchema.safeParse({
    ...formDataObj,
    instanceImages: imageUuids,
  });
  if (!validatedFormData.success) {
    console.log("Validation failed:", validatedFormData.error);
    return { message: "Invalid profile data." };
  }

  // Extract the validated data
  const data = validatedFormData.data;

  // STEP is a string in the formData; we’ll store it separately
  const step = data.step;
  // Remove step since it’s not a user column
  delete data.step;

  // ---- TYPE CONVERSIONS (if your DB requires certain types) ----
  // Convert glasses from "true"/"false" to boolean (if DB is a boolean column)
  const glassesBool = data.glasses === "true";

  // Convert age from string to number (if DB expects an int)
  // If your DB actually stores age as a string, skip this.
  const ageInt = parseInt(data.age, 10);

  // Build the DB object (spreading your Zod-validated strings)
  const userUpdateData: any = {
    ...data,
    instanceImages: data.instanceImages, // your array of strings
    glasses: glassesBool, // boolean
    age: isNaN(ageInt) ? null : ageInt, // integer or null
  };

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: userUpdateData,
    });

    console.log("User profile updated successfully.");

    // ----- Check final step (if step == "5") -----
    if (step === "5") {
      const updatedUser = await prisma.user.findUnique({
        where: { id: session.user.id },
      });

      if (!updatedUser) {
        return { message: "User not found." };
      }

      // Make sure all required fields are filled
      // (If your DB columns store them differently, adjust checks.)
      const requiredFields = [
        updatedUser.gender,
        updatedUser.age,
        updatedUser.hairColor,
        updatedUser.hairLength,
        updatedUser.ethnicity,
        updatedUser.bodyType,
        updatedUser.attire,
        updatedUser.backgrounds,
        // glasses is boolean, just ensure it's not null
        updatedUser.glasses,
      ];

      const allFieldsFilled = requiredFields.every(
        (field) => field !== null && field !== ""
      );

      if (allFieldsFilled) {
        // Mark hasDetails = true
        await prisma.user.update({
          where: { id: session.user.id },
          data: { hasDetails: true },
        });

        // Redirect to payment
        redirect("/payment");
      }
    }

    return { message: "User profile updated successfully." };
  } catch (error: any) {
    // If Next.js triggered a redirect internally, re-throw
    if (error && error.digest && error.digest.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.error(error);
    return { message: "Could not edit user profile.", error: error.message };
  }
}

/**
 * Calls your Python backend to generate images based on the user's details in the DB.
 */
export async function generateHeadshots() {
  // 1. Check if user is authenticated
  const session = await checkAuth();
  if (!session) {
    throw new Error("User not authenticated");
  }

  // 2. Fetch the user from the DB
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    throw new Error("User does not exist in the database");
  }

  // 3. Confirm that required details exist
  if (!user.hasDetails) {
    console.log("hasDetails is false or user's profile is incomplete");
    throw new Error("User's profile is incomplete or 'hasDetails' is false");
  }

  // 4. Prepare the request payload for the Python backend
  //    Include all relevant fields (images, gender, hairColor, etc.)
  const payload = {
    userId: user.id,
    gender: user.gender,
    hairColor: user.hairColor,
    hairLength: user.hairLength,
    ethnicity: user.ethnicity,
    bodyType: user.bodyType,
    attire: user.attire,
    backgrounds: user.backgrounds,
    glasses: user.glasses,
    instanceImages: user.instanceImages, // array of image URLs or UUIDs
    // ...any other fields you need
  };

  // 5. Call your Python FastAPI endpoint
  const pythonBackendURL = process.env.PYTHON_BACKEND_URL;
  // e.g., "https://your-ec2-domain-or-ip/generate"
  if (!pythonBackendURL) {
    throw new Error("Python backend URL is not set in environment variables");
  }

  const response = await fetch(`${pythonBackendURL}/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Python backend error:", errorText);
    throw new Error(
      `Python backend responded with status ${response.status}: ${errorText}`
    );
  }

  // 6. Parse response from Python (e.g. list of generated image URLs)
  const result = await response.json();

  // 7. (Optional) Store the generated results in your DB if needed
  // e.g.,
  // await prisma.user.update({
  //   where: { id: user.id },
  //   data: { generatedImages: result.generatedImages || [] },
  // });

  // 8. Return the result so your client can act on it
  return result;
}

// --- pet actions ---

export async function addPet(pet: unknown) {
  const session = await checkAuth();

  const validatedPet = petFormSchema.safeParse(pet);
  if (!validatedPet.success) {
    return {
      message: "Invalid pet data.",
    };
  }

  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    return {
      message: "Could not add pet.",
    };
  }

  revalidatePath("/app", "layout");
}

export async function editPet(petId: unknown, newPetData: unknown) {
  // authentication check
  const session = await checkAuth();

  // validation
  const validatedPetId = petIdSchema.safeParse(petId);
  const validatedPet = petFormSchema.safeParse(newPetData);

  if (!validatedPetId.success || !validatedPet.success) {
    return {
      message: "Invalid pet data.",
    };
  }

  // authorization check
  const pet = await getPetById(validatedPetId.data);
  if (!pet) {
    return {
      message: "Pet not found.",
    };
  }
  if (pet.userId !== session.user.id) {
    return {
      message: "Not authorized.",
    };
  }

  // database mutation
  try {
    await prisma.pet.update({
      where: {
        id: validatedPetId.data,
      },
      data: validatedPet.data,
    });
  } catch (error) {
    return {
      message: "Could not edit pet.",
    };
  }

  revalidatePath("/app", "layout");
}

export async function deletePet(petId: unknown) {
  // authentication check
  const session = await checkAuth();

  // validation
  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return {
      message: "Invalid pet data.",
    };
  }

  // authorization check
  const pet = await getPetById(validatedPetId.data);
  if (!pet) {
    return {
      message: "Pet not found.",
    };
  }
  if (pet.userId !== session.user.id) {
    return {
      message: "Not authorized.",
    };
  }

  // database mutation
  try {
    await prisma.pet.delete({
      where: {
        id: validatedPetId.data,
      },
    });
  } catch (error) {
    return {
      message: "Could not delete pet.",
    };
  }

  revalidatePath("/app", "layout");
}

// --- payment actions ---

export async function createCheckoutSession() {
  // authentication check
  const session = await checkAuth();

  console.log(session.user.email);

  const productPrice = process.env.PROD_PRICE;

  if (!productPrice) {
    throw new Error("PROD_PRICE is not defined in environment variables");
  }

  // create checkout session
  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: session.user.email,
    line_items: [
      {
        price: productPrice,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.CANONICAL_URL}/payment?success=true`,
    cancel_url: `${process.env.CANONICAL_URL}/payment?cancelled=true`,
  });

  // redirect user
  redirect(checkoutSession.url);
}

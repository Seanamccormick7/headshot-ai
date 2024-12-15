"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import H1 from "@/components/h1";
import GenderStep from "@/components/profileSteps/gender-step";
import HairStep from "@/components/profileSteps/hair-step";
import EthnicityStep from "@/components/profileSteps/ethnicity-step";
import AttireStep from "@/components/profileSteps/attire-step";
import { TUserProfile } from "@/lib/validations";
import UploadImageStep from "@/components/profileSteps/upload-img-step";

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentStep, setCurrentStep] = useState(1);

  //lifted up controlled state for all form fields. By default set them all to empty strings
  //TODO: need to by default set them to current users values (not necessary)
  const [formData, setFormData] = useState<TUserProfile>({
    gender: "",
    age: undefined,
    hairColor: "",
    hairLength: "",
    ethnicity: "",
    bodyType: "",
    attire: "",
    backgrounds: "",
    glasses: false,
  });

  useEffect(() => {
    const step = parseInt(searchParams.get("step") || "1", 10);
    setCurrentStep(step);
  }, [searchParams]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You must be signed in to view this page.</p>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const nextStep = () => {
    const next = currentStep + 1;
    router.push(`/profile?step=${next}`);
    //TODO: need to add validation here as well (already have zod schema, might want to use)
  };

  const prevStep = () => {
    const prev = currentStep - 1;
    router.push(`/profile?step=${prev}`);
  };

  return (
    <main className="flex flex-col items-center space-y-10">
      <H1>Profile Page</H1>
      <p>Welcome, {session.user.email}</p>

      {currentStep === 1 && (
        <GenderStep
          formData={formData}
          handleChange={handleChange}
          nextStep={nextStep}
        />
      )}
      {currentStep === 2 && (
        <HairStep
          formData={formData}
          handleChange={handleChange}
          prevStep={prevStep}
          nextStep={nextStep}
        />
      )}
      {currentStep === 3 && (
        <EthnicityStep
          formData={formData}
          handleChange={handleChange}
          prevStep={prevStep}
          nextStep={nextStep}
        />
      )}
      {currentStep === 4 && (
        <AttireStep
          formData={formData}
          handleChange={handleChange}
          prevStep={prevStep}
          nextStep={nextStep}
        />
      )}
      {currentStep === 5 && (
        <UploadImageStep
          formData={formData}
          handleChange={handleChange}
          prevStep={prevStep}
        />
      )}
    </main>
  );
}

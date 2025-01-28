// app/api/my-images/route.ts

import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/server-utils";
import prisma from "@/lib/db";
import { createSignedHeaders, md5hash } from "@/lib/uploadcare";

function getRfcDate() {
  return new Date().toUTCString();
}

export async function GET(request: NextRequest) {
  // 1) Check if user is authenticated
  const session = await checkAuth();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  // 2) Fetch that user’s DB record
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      generatedImages: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // 3) Return them to the client
  return NextResponse.json({
    generatedImages: user.generatedImages,
  });
}

//DELETING A GENERATED IMAGE:
export async function DELETE(request: NextRequest) {
  const session = await checkAuth();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const uuid = searchParams.get("uuid");
  if (!uuid) {
    return NextResponse.json({ error: "Missing image uuid" }, { status: 400 });
  }

  // 1) Check if user actually has this uuid in instanceImages or generatedImages
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      instanceImages: true,
      generatedImages: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Does the user have that UUID in instanceImages or generatedImages?
  const inInstance = user.instanceImages.includes(uuid);
  const inGenerated = user.generatedImages.includes(uuid);

  if (!inInstance && !inGenerated) {
    return NextResponse.json(
      { error: "Image does not belong to user." },
      { status: 403 }
    );
  }

  // 2) Call Uploadcare to delete the file
  try {
    const uri = `/files/${uuid}/`;
    const verb = "DELETE";
    const contentMd5 = md5hash("");
    const contentType = "application/json";
    const dateString = getRfcDate();

    const headers = createSignedHeaders(
      verb,
      contentMd5,
      contentType,
      dateString,
      uri
    );

    const ucRes = await fetch(`https://api.uploadcare.com${uri}`, {
      method: "DELETE",
      headers,
    });

    if (!ucRes.ok) {
      const errText = await ucRes.text();
      return NextResponse.json(
        { error: `UC delete failed: ${errText}` },
        { status: 500 }
      );
    }

    // 3) Remove the UUID from the user’s array in the DB
    if (inInstance) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          instanceImages: user.instanceImages.filter((id) => id !== uuid),
        },
      });
    } else {
      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          generatedImages: user.generatedImages.filter((id) => id !== uuid),
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

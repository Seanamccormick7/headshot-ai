"use client";
import H1 from "@/components/h1";
import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return null;
  }

  return (
    <main className="flex flex-col items-center space-y-10">
      <H1>Profile Page</H1>
      <p>Welcome, {session.user.name}</p>
      <H1>PROFILE PAGE</H1>

      <Link href={"/payment"}>Proceed to payment</Link>
    </main>
  );
}

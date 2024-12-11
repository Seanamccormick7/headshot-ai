"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import H1 from "@/components/h1";
import GenderStep from "@/components/profileSteps/gender-step";
import HairStep from "@/components/profileSteps/hair-step";
import EthnicityStep from "@/components/profileSteps/ethnicity-step";
import AttireStep from "@/components/profileSteps/attire-step";
import { ProfileFormDataT } from "@/lib/types";

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ProfileFormDataT>({
    gender: "",
    age: "",
    hairColor: "",
    hairLength: "",
    ethnicity: "",
    bodyType: "",
    attire: "",
    backgrounds: "",
    glasses: "",
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
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const nextStep = () => {
    const next = currentStep + 1;
    router.push(`/profile?step=${next}`);
  };

  const prevStep = () => {
    const prev = currentStep - 1;
    router.push(`/profile?step=${prev}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <main className="flex flex-col items-center space-y-10">
      <H1>Profile Page</H1>
      <p>Welcome, {session.user.name}</p>

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
          handleSubmit={handleSubmit}
        />
      )}
    </main>
  );
}

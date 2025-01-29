"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { TUserProfile } from "@/lib/validations";
import { RadioCardGroup } from "../radio-card-group";

const attireOptions = [
  { value: "casual", label: "Casual", image: "/logo.svg" },
  { value: "formal", label: "Formal", image: "/logo.svg" },
  { value: "sporty", label: "Sporty", image: "/logo.svg" },
  // Add more as needed
];

const backgroundOptions = [
  { value: "studio", label: "Studio", image: "/logo.svg" },
  { value: "outdoor", label: "Outdoor", image: "/logo.svg" },
  { value: "city", label: "City", image: "/logo.svg" },
  // Add more as needed
];

const glassesOptions = [
  { value: "true", label: "With Glasses", image: "/logo.svg" },
  { value: "false", label: "Without Glasses", image: "/logo.svg" },
];

export default function AttireStep({
  formData,
  handleChange,
  prevStep,
  nextStep,
}: {
  formData: TUserProfile;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  prevStep: () => void;
  nextStep: () => void;
}) {
  console.log(formData.attire);
  return (
    <div>
      {/* Attire */}
      <div className="mb-4">
        <Label className="mb-2 block" htmlFor="attire">
          Attire
        </Label>
        <RadioCardGroup
          name="attire"
          currentValue={formData.attire}
          options={attireOptions}
          onChange={handleChange}
        />
      </div>

      {/* Backgrounds */}
      <div className="mb-4">
        <Label className="mb-2 block" htmlFor="backgrounds">
          Backgrounds
        </Label>
        <RadioCardGroup
          name="backgrounds"
          currentValue={formData.backgrounds}
          options={backgroundOptions}
          onChange={handleChange}
        />
      </div>

      {/* Glasses */}
      <div className="mb-4">
        <Label className="mb-2 block" htmlFor="glasses">
          Glasses
        </Label>
        <RadioCardGroup
          name="glasses"
          currentValue={String(formData.glasses)}
          options={glassesOptions}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-between">
        <Button type="button" onClick={prevStep}>
          Previous
        </Button>
        <Button type="submit" onClick={nextStep}>
          Next
        </Button>
      </div>
    </div>
  );
}

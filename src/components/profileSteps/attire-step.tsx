"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { TUserProfile } from "@/lib/validations";
import { RadioCardGroup } from "../radio-card-group";

const attireOptions = [
  { value: "casual", label: "Casual", image: "/images/36.webp" },
  { value: "semiformal", label: "Business Casual", image: "/images/40.webp" },
  { value: "formal", label: "Formal", image: "/images/31.webp" },
  // Add more as needed
];

const backgroundOptions = [
  { value: "studio", label: "Studio", image: "/images/28.webp" },
  { value: "outdoor", label: "Outdoor", image: "/images/11.webp" },
  { value: "city", label: "City", image: "/images/2.webp" },
  { value: "office", label: "Office", image: "/images/7.webp" },
  // Add more as needed
];

const glassesOptions = [
  { value: "true", label: "With Glasses", image: "/images/39.webp" },
  { value: "false", label: "Without Glasses", image: "/images/33.webp" },
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

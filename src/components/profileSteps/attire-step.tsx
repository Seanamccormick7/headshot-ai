"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { TUserProfile } from "@/lib/validations";
import { updateProfile } from "@/actions/actions";
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
  return (
    <form action={updateProfile}>
      {/* Hidden step field */}
      <input type="hidden" name="step" value="4" />

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

      {/* Glasses (still a checkbox) */}
      <div className="mb-4">
        <Label className="mb-2 inline-flex items-center" htmlFor="glasses">
          <input
            id="glasses"
            name="glasses"
            type="checkbox"
            checked={formData.glasses}
            onChange={handleChange}
            className="mr-2"
          />
          With or Without Glasses
        </Label>
      </div>

      <div className="flex justify-between">
        <Button type="button" onClick={prevStep}>
          Previous
        </Button>
        <Button type="submit" onClick={nextStep}>
          Next
        </Button>
      </div>
    </form>
  );
}

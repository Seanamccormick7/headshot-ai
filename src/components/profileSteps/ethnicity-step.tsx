"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { TUserProfile } from "@/lib/validations";
import { updateProfile } from "@/actions/actions";
import { RadioCardGroup } from "@/components/radio-card-group"; // Adjust path

const ethnicityOptions = [
  { value: "asian", label: "Asian", image: "/logo.svg" },
  { value: "white", label: "White", image: "/logo.svg" },
  { value: "black", label: "Black", image: "/logo.svg" },
  // Add more as needed
];

const bodyTypeOptions = [
  { value: "slim", label: "Slim", image: "/logo.svg" },
  { value: "average", label: "Average", image: "/logo.svg" },
  { value: "muscular", label: "Muscular", image: "/logo.svg" },
  // Add more as needed
];

export default function EthnicityStep({
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
      <input type="hidden" name="step" value="3" />

      <div className="mb-4">
        <Label className="mb-2 block" htmlFor="ethnicity">
          Ethnicity
        </Label>
        <RadioCardGroup
          name="ethnicity"
          currentValue={formData.ethnicity ? formData.ethnicity : ""}
          options={ethnicityOptions}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <Label className="mb-2 block" htmlFor="bodyType">
          Body Type
        </Label>
        <RadioCardGroup
          name="bodyType"
          currentValue={formData.bodyType ? formData.bodyType : ""}
          options={bodyTypeOptions}
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
    </form>
  );
}

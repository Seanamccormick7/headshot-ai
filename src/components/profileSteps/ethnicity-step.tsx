"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { TUserProfile } from "@/lib/validations";
import { RadioCardGroup } from "@/components/radio-card-group"; // Adjust path

const ethnicityOptions = [
  { value: "asian", label: "Asian", image: "/images/13.webp" },
  { value: "white", label: "White", image: "/images/10.webp" },
  { value: "black", label: "Black", image: "/images/16.webp" },
  { value: "hispanic", label: "Hispanic", image: "/images/15.webp" },
  { value: "arab", label: "Arab", image: "/images/22.webp" },
  // Add more as needed
];

const bodyTypeOptions = [
  { value: "slim", label: "Slim", image: "/images/9.webp" },
  { value: "average", label: "Average", image: "/images/7.webp" },
  { value: "heavier", label: "Heavier", image: "/images/29.webp" },
  { value: "muscular", label: "Muscular", image: "/images/34.webp" },
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
    <div>
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
    </div>
  );
}

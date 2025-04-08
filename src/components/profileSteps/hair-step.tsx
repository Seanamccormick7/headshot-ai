"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { TUserProfile } from "@/lib/validations";
import { RadioCardGroup } from "@/components/radio-card-group"; // Adjust path

const hairColorOptions = [
  { value: "blonde", label: "Blonde", image: "/images/27.webp" },
  { value: "brown", label: "Brown", image: "/images/8.webp" },
  { value: "black", label: "Black", image: "/images/20.webp" },
  // Add more as needed
];

const hairLengthOptions = [
  { value: "short", label: "Short", image: "/images/24.webp" },
  { value: "medium", label: "Medium", image: "/images/39.webp" },
  { value: "long", label: "Long", image: "/images/3.webp" },
  // Add more as needed
];

export default function HairStep({
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
        <Label className="mb-2 block" htmlFor="hairColor">
          Hair Color
        </Label>
        <RadioCardGroup
          name="hairColor"
          currentValue={formData.hairColor ? formData.hairColor : ""}
          options={hairColorOptions}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <Label className="mb-2 block" htmlFor="hairLength">
          Hair Length
        </Label>
        <RadioCardGroup
          name="hairLength"
          currentValue={formData.hairLength ? formData.hairLength : ""}
          options={hairLengthOptions}
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

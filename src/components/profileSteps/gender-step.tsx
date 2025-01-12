"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { TUserProfile } from "@/lib/validations";
import { updateProfile } from "@/actions/actions";
import { RadioCardGroup } from "@/components/radio-card-group"; // Adjust path

const genderOptions = [
  { value: "male", label: "Male", image: "/logo.svg" },
  { value: "female", label: "Female", image: "/logo.svg" },
  // Add more as needed
];

const ageOptions = [
  { value: "18", label: "18", image: "/logo.svg" },
  { value: "25", label: "25", image: "/logo.svg" },
  { value: "30", label: "30", image: "/logo.svg" },
  // Add more as needed
];

export default function GenderStep({
  formData,
  handleChange,
  nextStep,
}: {
  formData: TUserProfile;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
}) {
  return (
    <form action={updateProfile}>
      <input type="hidden" name="step" value="1" />

      <div className="mb-4">
        <Label className="mb-2 block" htmlFor="gender">
          Gender
        </Label>
        <RadioCardGroup
          name="gender"
          currentValue={formData.gender ? formData.gender : ""}
          options={genderOptions}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <Label className="mb-2 block" htmlFor="age">
          Age
        </Label>
        <RadioCardGroup
          name="age"
          currentValue={formData.age ? String(formData.age) : ""}
          options={ageOptions}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" onClick={nextStep}>
        Next
      </Button>
    </form>
  );
}

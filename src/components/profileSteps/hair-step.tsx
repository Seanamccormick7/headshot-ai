import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { TUserProfile } from "@/lib/validations";

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
      <div>
        <Label htmlFor="hairColor">Hair Color</Label>
        <Input
          id="hairColor"
          name="hairColor"
          value={formData.hairColor}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="hairLength">Hair Length</Label>
        <Input
          id="hairLength"
          name="hairLength"
          value={formData.hairLength}
          onChange={handleChange}
          required
        />
      </div>
      <Button onClick={prevStep}>Previous</Button>
      <Button onClick={nextStep}>Next</Button>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { ProfileFormDataT } from "@/lib/types";

export default function GenderStep({
  formData,
  handleChange,
  nextStep,
}: {
  formData: ProfileFormDataT;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
}) {
  return (
    <div>
      <div>
        <Label htmlFor="gender">Gender</Label>
        <Input
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>
      <Button onClick={nextStep}>Next</Button>
    </div>
  );
}

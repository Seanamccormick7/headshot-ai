import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { updateProfile } from "@/actions/actions";
import { TUserProfile } from "@/lib/validations";

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
    <form action={() => updateProfile(formData, 1)}>
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
      <Button type="submit" onClick={nextStep}>
        Next
      </Button>
    </form>
  );
}

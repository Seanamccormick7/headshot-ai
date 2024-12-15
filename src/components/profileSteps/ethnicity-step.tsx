import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { TUserProfile } from "@/lib/validations";
import { updateProfile } from "@/actions/actions";

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
      <div>
        <Label htmlFor="ethnicity">Ethnicity</Label>
        <Input
          id="ethnicity"
          name="ethnicity"
          value={formData.ethnicity}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="bodyType">Body Type</Label>
        <Input
          id="bodyType"
          name="bodyType"
          value={formData.bodyType}
          onChange={handleChange}
          required
        />
      </div>
      <Button onClick={prevStep}>Previous</Button>
      <Button type="submit" onClick={nextStep}>
        Next
      </Button>
    </form>
  );
}

import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { ProfileFormDataT } from "@/lib/types";

export default function EthnicityStep({
  formData,
  handleChange,
  prevStep,
  nextStep,
}: {
  formData: ProfileFormDataT;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  prevStep: () => void;
  nextStep: () => void;
}) {
  return (
    <div>
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
      <Button onClick={nextStep}>Next</Button>
    </div>
  );
}

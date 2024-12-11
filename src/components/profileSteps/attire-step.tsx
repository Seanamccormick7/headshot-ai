import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { ProfileFormDataT } from "@/lib/types";

export default function AttireStep({
  formData,
  handleChange,
  prevStep,
  handleSubmit,
}: {
  formData: ProfileFormDataT;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  prevStep: () => void;
  handleSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <div>
      <div>
        <Label htmlFor="attire">Attire</Label>
        <Input
          id="attire"
          name="attire"
          value={formData.attire}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="backgrounds">Backgrounds</Label>
        <Input
          id="backgrounds"
          name="backgrounds"
          value={formData.backgrounds}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="glasses">With or Without Glasses</Label>
        <Input
          id="glasses"
          name="glasses"
          value={formData.glasses}
          onChange={handleChange}
          required
        />
      </div>
      <Button onClick={prevStep}>Previous</Button>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}

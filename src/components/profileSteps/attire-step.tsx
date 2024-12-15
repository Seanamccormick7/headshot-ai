import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { TUserProfile } from "@/lib/validations";
import { updateProfile } from "@/actions/actions";

export default function AttireStep({
  formData,
  handleChange,
  prevStep,
}: {
  formData: TUserProfile;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  prevStep: () => void;
}) {
  return (
    <form action={updateProfile}>
      <input type="hidden" name="step" value="4" />
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
          type="checkbox"
          checked={formData.glasses}
          onChange={handleChange}
        />
      </div>
      <Button onClick={prevStep}>Previous</Button>
      <Button type="submit">Submit</Button>
    </form>
  );
}

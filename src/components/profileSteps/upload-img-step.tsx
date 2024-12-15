import { Button } from "@/components/ui/button";
import { TUserProfile } from "@/lib/validations";
import { updateProfile } from "@/actions/actions";
import { useState } from "react";

import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";

export default function UploadImageStep({
  formData,
  handleChange,
  prevStep,
}: {
  formData: TUserProfile;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  prevStep: () => void;
}) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  return (
    <form action={updateProfile}>
      <input type="hidden" name="step" value="5" />
      <div>
        <FileUploaderRegular
          sourceList="local, url, camera, dropbox, gdrive"
          classNameUploader="uc-light"
          pubkey="287d16f78a4a39098943"
        />
      </div>
      <Button onClick={prevStep}>Previous</Button>
      {/* TODO: On submit, I need to add thumbnail images (can easily be created on the website)
      to the user images in the db. This way I can know if the user has already entered images or not.
      Might also have to do signed urls */}
      <Button type="submit">Submit</Button>
    </form>
  );
}

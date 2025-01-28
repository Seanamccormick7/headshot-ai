import { Button } from "@/components/ui/button";
import { TUserProfile } from "@/lib/validations";
import { updateProfile } from "@/actions/actions";
import { useState } from "react";

import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";
import Image from "next/image";

export default function UploadImageStep({
  formData,
  handleChange,
  prevStep,
}: {
  formData: TUserProfile;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  prevStep: () => void;
}) {
  const [imageUuids, setImageUuids] = useState<string[]>([]);
  console.log(imageUuids);
  return (
    <>
      <div>
        <FileUploaderRegular
          sourceList="local, url, camera, dropbox, gdrive"
          classNameUploader="uc-light"
          pubkey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY || ""}
          onChange={(outputState) => {
            // Extract successful file entries
            const uploadedFiles = outputState.successEntries;
            // Map over each file to get the uuid
            const uuids = uploadedFiles.map((file) => file.uuid);
            setImageUuids(uuids);
          }}
        />
      </div>

      <form action={updateProfile}>
        <input type="hidden" name="step" value="5" />

        {imageUuids.map((uuid, index) => (
          <input
            type="hidden"
            name="instanceImages[]"
            value={uuid}
            key={index}
          />
        ))}

        <Button onClick={prevStep}>Previous</Button>
        <Button type="submit">Submit</Button>
      </form>

      {/* Displaying images */}
      {imageUuids.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Uploaded Images:</h3>
          {imageUuids.map((uuid, index) => (
            <Image
              key={index}
              src={`https://ucarecdn.com/${uuid}/`}
              alt={`Uploaded ${index}`}
              style={{ maxWidth: "200px" }}
              width={400}
              height={400}
            />
          ))}
        </div>
      )}
    </>
  );
}

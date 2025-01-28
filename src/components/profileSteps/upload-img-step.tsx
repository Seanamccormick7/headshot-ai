"use client";
import { Button } from "@/components/ui/button";
import { TUserProfile } from "@/lib/validations";
import { useState } from "react";
import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";
import Image from "next/image";

export default function UploadImageStep({
  formData,
  handleChange,
  prevStep,
  onFinalSubmit,
}: {
  formData: TUserProfile;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  prevStep: () => void;
  onFinalSubmit: (images: string[]) => void; // new prop
}) {
  const [imageUuids, setImageUuids] = useState<string[]>([]);

  const handleSubmit = () => {
    onFinalSubmit(imageUuids);
  };

  return (
    <div>
      <div>
        <FileUploaderRegular
          sourceList="local, url, camera, dropbox, gdrive"
          classNameUploader="uc-light"
          pubkey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY || ""}
          onChange={(outputState) => {
            const uploadedFiles = outputState.successEntries;
            const uuids = uploadedFiles.map((file) => file.uuid);
            setImageUuids(uuids);
          }}
        />
      </div>

      <div className="mt-4 space-x-2">
        <Button onClick={prevStep}>Previous</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>

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
    </div>
  );
}

"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type MyImagesResponse = {
  generatedImages: string[];
};

export default function GalleryPage() {
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/my-images");
        if (!res.ok) {
          throw new Error("Failed to get images");
        }
        const data: MyImagesResponse = await res.json();
        setGeneratedImages(data.generatedImages || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Loading images...</p>;

  if (generatedImages.length === 0) {
    return (
      <p>
        No generated images yet. Check back soon! Please note that image
        generation may take up to 2 hours to complete.
      </p>
    );
  }

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {generatedImages.map((uuid, idx) => (
          <div
            key={uuid}
            style={{
              border: "1px solid #ccc",
              padding: "0.5rem",
            }}
          >
            <Image
              // Convert each UUID into a full URL:
              src={`https://ucarecdn.com/${uuid}/`}
              alt={`Generated image #${idx + 1}`}
              width={400}
              height={400}
              // or use `fill` / `unoptimized` if you prefer
            />
          </div>
        ))}
      </div>
    </div>
  );
}

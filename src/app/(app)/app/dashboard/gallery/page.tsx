"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FiTrash2, FiDownload, FiStar } from "react-icons/fi";

type UploadcareFile = {
  uuid: string;
  original_filename: string;
  original_file_url: string;
  // ... add any other fields from the UC response you need
};

export default function GalleryPage() {
  const [files, setFiles] = useState<UploadcareFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<UploadcareFile | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/uploadcare");
        const data = await res.json();
        // data.results is an array of file objects
        setFiles(data.results || []);
      } catch (error) {
        console.error("Failed to fetch UC files:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleDeleteFile(uuid: string) {
    try {
      const res = await fetch(`/api/uploadcare?uuid=${uuid}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Delete error");
      }
      // Remove from local state
      setFiles((prev) => prev.filter((f) => f.uuid !== uuid));
    } catch (error) {
      console.error("Could not delete file:", error);
    }
  }

  function handleOpenModal(file: UploadcareFile) {
    setSelectedFile(file);
  }

  function handleCloseModal() {
    setSelectedFile(null);
  }

  function handleDownloadFile(file: UploadcareFile) {
    // If you want to force download, you can create a hidden <a download> or just open new tab
    window.open(file.original_file_url, "_blank");
  }

  function handleFavoriteFile(file: UploadcareFile) {
    // Example: Mark as favorite in your DB
    console.log("Favorited", file.uuid);
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>My Uploadcare Gallery</h1>
      {loading && <p>Loading...</p>}

      {!loading && files.length === 0 && <p>No files found.</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {files.map((file) => (
          <div
            key={file.uuid}
            style={{
              border: "1px solid #ccc",
              padding: "0.5rem",
              width: "200px",
              position: "relative",
            }}
          >
            <div style={{ fontWeight: "bold" }}>{file.original_filename}</div>
            <Image
              src={file.original_file_url}
              alt={file.original_filename}
              style={{ width: "100%", cursor: "pointer" }}
              onClick={() => handleOpenModal(file)}
            />
            <div
              style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem" }}
            >
              <button onClick={() => handleFavoriteFile(file)}>
                <FiStar /> Favorite
              </button>
              <button onClick={() => handleDownloadFile(file)}>
                <FiDownload /> Download
              </button>
              <button onClick={() => handleDeleteFile(file.uuid)}>
                <FiTrash2 /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedFile && <Modal file={selectedFile} onClose={handleCloseModal} />}
    </div>
  );
}

// A simple modal for full-resolution view
function Modal({
  file,
  onClose,
}: {
  file: UploadcareFile;
  onClose: () => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          padding: "1rem",
          maxWidth: "90vw",
          maxHeight: "90vh",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{file.original_filename}</h2>
        <Image
          src={file.original_file_url}
          alt={file.original_filename}
          style={{ maxWidth: "100%", maxHeight: "80vh" }}
        />
      </div>
    </div>
  );
}

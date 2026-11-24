"use client";

import * as React from "react";

import { Avatar } from "@/components/ui/avatar";
import { FileItem, FileUpload } from "@/components/ui/file-upload";

type Upload = { name: string; size: number; status: "uploading" | "complete" };

/**
 * Profile photo — avatar preview plus the kit's drop zone. Uploads are
 * simulated here; swap the timer for your storage call (S3, UploadThing, …).
 */
function ProfilePhoto({ name }: { name: string }) {
  const [file, setFile] = React.useState<Upload | null>({
    name: "dejan-portrait.jpg",
    size: 284_000,
    status: "complete",
  });

  const onFiles = (files: File[]) => {
    const f = files[0];
    if (!f) return;
    setFile({ name: f.name, size: f.size, status: "uploading" });
    window.setTimeout(() => setFile((cur) => (cur ? { ...cur, status: "complete" } : cur)), 1200);
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
      <Avatar name={name} size="lg" className="size-16 text-base" />
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <FileUpload onFiles={onFiles} accept="image/*" multiple={false} hint="PNG or JPG, at least 256×256px" />
        {file && (
          <FileItem
            name={file.name}
            size={file.size}
            status={file.status}
            progress={file.status === "uploading" ? 64 : 100}
            onRemove={() => setFile(null)}
          />
        )}
      </div>
    </div>
  );
}

export { ProfilePhoto };

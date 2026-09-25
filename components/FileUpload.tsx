"use client";

import {
  Image,
  ImageKitProvider,
  Video,
  upload,
} from "@imagekit/next";
import config from "@/lib/config";
import { useRef, useState } from "react";
import NextImage from "next/image";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/toast"

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(
      `${config.env.apiEndpoint}/api/auth/imagekit`
    );

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();

    return {
      token: data.token,
      expire: data.expire,
      signature: data.signature,
    };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

interface Props {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  onFileChange: (filePath: string) => void;
  value?: string;
}

const FileUpload = ({
  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
  value,
}: Props) => {


  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<{ filePath: string | null }>({
    filePath: value ?? null,
  });

  const [progress, setProgress] = useState(0);

  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-300"
        : "bg-white border-gray-100 border",
    placeholder:
      variant === "dark" ? "text-light-100" : "text-slate-500",
    text:
      variant === "dark" ? "text-light-100" : "text-dark-400",
  };

  const onValidate = (file: File) => {
    if (type === "image" && file.size > 20 * 1024 * 1024) {
      toast.add({
        title: "File size too large",
        description:
          "Please upload a file that is less than 20MB in size",
        // variant: "destructive",
        type: "error"
      });

      return false;
    }

    else if (type === "video" && file.size > 50 * 1024 * 1024) {
      toast.add({
        title: "File size too large",
        description:
          "Please upload a file that is less than 50MB in size",
        // variant: "destructive",
        type: "error"
      });

      return false;
    }

    return  true;
  };

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    if (!onValidate(selectedFile)) return;

    try {
      setProgress(0);

      const auth = await authenticator();

      const response = await upload({
        file: selectedFile,
        fileName: selectedFile.name,
        folder,
        useUniqueFileName: true,

        token: auth.token,
        expire: auth.expire,
        signature: auth.signature,
        publicKey,

        onProgress: (event) => {
          const percent = Math.round(
            (event.loaded / event.total) * 100
          );

          setProgress(percent);
        },
      });

      setFile({ filePath: response.filePath ?? null });

      if (response.filePath) {
        onFileChange(response.filePath);
      }

      toast.add({
        title: `${type} uploaded successfully`,
        description: `${response.filePath} uploaded successfully!`,
        type: "success",
      });
    } catch (error) {
      console.error(error);

        toast.add({
          title: `${type} upload failed`,
          description: `Your ${type} could not be uploaded. Please try again.`,
          type: "error",
        });
    }
  };

  return (
    <ImageKitProvider urlEndpoint={urlEndpoint}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleUpload}
        className="hidden"
      />

      <button
        className={cn("upload-btn", styles.button)}
        onClick={(e) => {
          e.preventDefault();
          fileInputRef.current?.click();
        }}
      >
        <NextImage
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />

        <p className={cn("text-base", styles.placeholder)}>
          {placeholder}
        </p>

        {file?.filePath && (
          <p className={cn("upload-filename", styles.text)}>
            {file.filePath}
          </p>
        )}
      </button>

      {progress > 0 && progress !== 100 && (
        <div className="w-full rounded-full bg-green-200">
          <div
            className="progress"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      )}

      {file?.filePath &&
        (type === "image" ? (
          <Image
            alt="Uploaded image"
            src={file.filePath}
            width={500}
            height={300}
          />
        ) : (
          <Video
            src={file.filePath}
            controls
            className="h-96 w-full rounded-xl"
          />
        ))}
    </ImageKitProvider>
  );
};

export default FileUpload;
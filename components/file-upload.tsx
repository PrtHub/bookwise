import { toast } from "@/hooks/use-toast";
import config from "@/lib/config";
import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import Image from "next/image";
import { useRef, useState } from "react";

interface FileUploadProps {
  type?: "image" | "file";
  accept?: string;
  placeholder?: string;
  folder?: string;
  variant?: "dark" | "light";
  onFileChange?: (file: File) => void;
}

const authenticator = async () => {
  try {
    const res = await fetch(`${config.env.apiUrl}/api/auth/imagekit`);

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to authenticate with ImageKit: ${errorText}`);
    }

    const data = await res.json();

    const { signature, expire, token } = data;

    return { signature, expire, token };
  } catch (error) {
    throw new Error("Could not authenticate with ImageKit", { cause: error });
  }
};

const FileUpload = ({
  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
}: FileUploadProps) => {
  const IkUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange?.(res.filePath);

    toast({
      title: "Success",
      description: `${res.filePath} uploaded successfully!`,
      variant: "success",
    });
  };

  const onError = (error: any) => {
    console.log("Error", error);

    toast({
      title: "Image upload failed",
      description: error.message,
      variant: "destructive",
    });
  };

  return (
    <ImageKitProvider
      authenticator={authenticator}
      urlEndpoint={config.env.imageKit.urlEndpoint}
      publicKey={config.env.imageKit.publicKey}
    >
      <IKUpload
        ref={IkUploadRef}
        className="hidden"
        onSuccess={onSuccess}
        onError={onError}
        fileName=""
      />

      <button
        type="button"
        className="upload-btn bg-dark-300"
        onClick={(e) => {
          e.preventDefault();
          if (!IkUploadRef.current) return;
          // @ts-ignore
          IkUploadRef.current?.click();
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className="text-base text-light-100">{placeholder}</p>

        {/* {file && <p className="upload-filename">{file.filePath}</p>} */}
      </button>

      {file && (
        <IKImage
           path={file.filePath}
           alt={file.filePath}
           width={500}
           height={300}
        />
      )}
    </ImageKitProvider>
  );
};

export default FileUpload;

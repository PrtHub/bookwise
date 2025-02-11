import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "@/hooks/use-toast";
import config from "@/lib/config";
import { cn } from "@/lib/utils";
import { IKImage, IKUpload, IKVideo, ImageKitProvider } from "imagekitio-next";

interface FileUploadProps {
  type?: "image" | "video";
  accept?: string;
  placeholder?: string;
  folder?: string;
  variant?: "dark" | "light";
  onFileChange?: (file: File) => void;
  value?: string | null;
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
  value,
}: FileUploadProps) => {
  const IkUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string | null }>({
    filePath: value ?? null,
  });

  const [progress, setProgress] = useState(0);

  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-300"
        : "bg-light-600 border-gray-100 border",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
  };

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange?.(res.filePath);

    toast({
      title: `${type} uploaded successfully!`,
      description: `${res.filePath} uploaded successfully!`,
      variant: "success",
    });
  };

  const onError = (error: any) => {
    console.log("Error", error);

    toast({
      title: `${type} upload failed`,
      description: error.message,
      variant: "destructive",
    });
  };

  const validate = (file: File) => {
    if (type === "image") {
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 20MB.",
          variant: "destructive",
        });
        return false;
      }
    } else if (type === "video") {
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 50MB.",
          variant: "destructive",
        });
        return false;
      }
    }

    return true;
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
        useUniqueFileName={true}
        validateFile={validate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percentage = Math.round((loaded / total) * 100);
          setProgress(percentage);
        }}
        folder={folder}
        accept={accept}
      />

      <button
        type="button"
        className={`upload-btn ${styles.button}`}
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
       {!file.filePath && <p className={styles.placeholder}>{placeholder}</p>}

        {file.filePath && (
          <p className={cn("upload-filename", styles.text)}>{file.filePath}</p>
        )}
      </button>

      {progress > 0 &&  progress < 100 && (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}

      {file.filePath &&
        (type === "image" ? (
          <IKImage
            alt={file.filePath}
            path={file.filePath}
            width={500}
            height={300}
          />
        ) : (
          type === "video" && (
            <IKVideo
              path={file.filePath}
              controls={true}
              className="h-96 w-full rounded-xl"
            />
          )
        ))}
    </ImageKitProvider>
  );
};

export default FileUpload;

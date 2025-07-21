"use client";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import info from "@/public/icons/info.svg";
import pdffile from "@/public/images/pdf.png";
import remove from "@/public/icons/cross.svg";
import { formatSize } from "@/lib/utils";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;
      setSelectedFile(file);
      onFileSelect?.(file);
    },
    [onFileSelect]
  );

  const handleRemoveFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedFile(null);
    onFileSelect?.(null);
  };

  const maxFileSize = 20 * 1024 * 1024; // 20 MB
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "application/pdf": [".pdf"] },
    maxSize: 20 * 1024 * 1024,
  });

  return (
    <div className="w-full gradient-border">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="space-y-4 cursor-pointer">
          {selectedFile ? (
            <div
              className="uploader-selected-file"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={pdffile}
                alt="File"
                width={24}
                height={24}
                className="size-10"
              />
              <div className="flex items-center space-x-3">
                <div>
                  <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                    {selectedFile.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatSize(selectedFile.size)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="p-2 cursor-pointer hover:bg-red-50 rounded-md"
                onClick={handleRemoveFile}
              >
                <Image
                  src={remove}
                  alt="remove"
                  width={16}
                  height={16}
                  className="size-4"
                />
              </button>
            </div>
          ) : !isDragActive ? (
            <div>
              <div className="mx-auto w-16 h-16 flex items-center justify-center">
                <Image src={info} alt="Info" />
              </div>
              <p className="text-lg text-gray-500">
                <span className="font-semibold">Click to Upload</span> or Drag
                and Drop
              </p>
              <p className="text-lg text-gray-500">
                PDF max {formatSize(maxFileSize)}
              </p>
            </div>
          ) : (
            <p className="text-lg text-gray-500">Drop the file here...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;

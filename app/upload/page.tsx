"use client";
import Image from "next/image";
import { FormEvent, useState } from "react";
import resumescan from "@/public/images/resume-scan.gif";
import FileUploader from "@/components/FileUploader";
import { AuthGuard } from "@/components/AuthGuard";
const Upload = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);
    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;
    console.log({ companyName, jobTitle, jobDescription, file });
  };
  return (
    <AuthGuard>
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Smart Feedback for Your Dream Job</h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <Image
                src={resumescan}
                alt="Resume Scan"
                width={200}
                height={200}
                className="rounded-full"
              />
            </>
          ) : (
            <h2>Drop your Resume for ATS Score and Improvement Tips</h2>
          )}
          {!isProcessing && (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 mt-8"
            >
              <div className="form-div">
                <label htmlFor="company-name">Company Name</label>
                <input
                  type="text"
                  name="company-name"
                  placeholder="Enter company name"
                  id="company-name"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-title">Job Title</label>
                <input
                  type="text"
                  name="job-title"
                  placeholder="Enter job title"
                  id="job-title"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-description">Job Description</label>
                <textarea
                  rows={5}
                  name="job-description"
                  placeholder="Enter job description"
                  id="job-description"
                />
              </div>
              <div className="form-div">
                <label htmlFor="uploader">Upload Resume</label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>
              <button className="primary-button" type="submit">
                Analyze Resume
              </button>
            </form>
          )}
        </div>
      </section>
    </AuthGuard>
  );
};

export default Upload;

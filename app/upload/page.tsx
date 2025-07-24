"use client";
import Image from "next/image";
import { FormEvent, useState } from "react";
import resumescan from "@/public/images/resume-scan.gif";
import FileUploader from "@/components/FileUploader";
import { AuthGuard } from "@/components/AuthGuard";
import { usePuterStore } from "@/lib/puter";
import { useRouter } from "next/navigation";
import { convertPdfToImage } from "@/lib/pdf2img";
import { generateUUID } from "@/lib/utils";
import { prepareInstructions } from "@/constants/page";
const Upload = () => {
  const router = useRouter();
  const { auth, isLoading, ai, fs, kv } = usePuterStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setIsProcessing(true);
    setStatusText("Uploading File...");
    const uploadFile = await fs.upload([file]);
    if (!uploadFile) {
      setStatusText("File upload failed. Please try again.");
      setTimeout(() => {
        setIsProcessing(false);
      }, 3000);
      return;
    }
    setStatusText("Converting to Image...");
    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file) {
      setStatusText("Failed to convert PDF to image.");
      setTimeout(() => {
        setIsProcessing(false);
      }, 3000);
      return;
    }
    setStatusText("Uploading the Image...");
    const imageUpload = await fs.upload([imageFile.file]);
    if (!imageUpload) {
      setStatusText("Image upload failed. Please try again.");
      setTimeout(() => {
        setIsProcessing(false);
      }, 3000);
      return;
    }
    setStatusText("Preparing Data...");
    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: uploadFile.path,
      imagePath: imageUpload.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: "",
    };
    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusText("Analyzing Resume...");
    const feedback = await ai.feedback(
      uploadFile.path,
      prepareInstructions({ jobTitle, jobDescription })
    );
    if (!feedback) {
      setStatusText("Failed to analyze resume. Please try again.");
      setTimeout(() => {
        setIsProcessing(false);
      }, 3000);
      return;
    }
    const feedbackText =
      feedback.message.content === "string"
        ? feedback.message.content
        : feedback.message.content[0].text;
    data.feedback = feedbackText;
    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusText("Analysis Complete! Redirecting...");
    setTimeout(() => {
      setIsProcessing(false);
      router.push(`/resume/${uuid}`);
    }, 3000);
    console.log("Resume Analysis Data:", data);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);
    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;
    if (!file) return;
    handleAnalyze({
      companyName,
      jobTitle,
      jobDescription,
      file,
    });
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

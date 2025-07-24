"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ScoreCircle from "./ScoreCircle";
import Image from "next/image";
import { usePuterStore } from "@/lib/puter";

const ResumeCard = ({ resume }: { resume: Resume }) => {
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const { fs } = usePuterStore();

  // Safe feedback parsing with error handling
  const parsedFeedback = (() => {
    try {
      if (typeof resume.feedback === "string") {
        // Cast to string to ensure TypeScript knows it's a string
        const feedbackString = resume.feedback as string;

        // Check if feedback string is not empty and is valid
        if (!feedbackString || feedbackString.trim() === "") {
          console.warn("Empty feedback string for resume:", resume.id);
          return { overallScore: 0 };
        }
        return JSON.parse(feedbackString);
      }
      return resume.feedback || { overallScore: 0 };
    } catch (error) {
      console.error("Error parsing feedback for resume:", resume.id, error);
      console.log("Problematic feedback value:", resume.feedback);
      return { overallScore: 0 };
    }
  })();

  useEffect(() => {
    const loadResume = async () => {
      try {
        const blob = await fs.read(resume.imagePath);
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        setResumeUrl(url);
      } catch (error) {
        console.error("Error loading resume image:", error);
      }
    };

    if (resume.imagePath && fs) {
      loadResume();
    }
  }, [resume.imagePath, fs]);

  return (
    <Link
      href={`/resume/${resume.id}`}
      className="resume-card animate-in fade-in duration-1000"
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          {resume.companyName && (
            <h2 className="font-bold !text-black break-words">
              {resume.companyName}
            </h2>
          )}
          {resume.jobTitle && (
            <h3 className="text-lg text-gray-500 break-words">
              {resume.jobTitle}
            </h3>
          )}
          {!resume.companyName && !resume.jobTitle && (
            <h2 className="text-black font-bold">Resume</h2>
          )}
        </div>
        <div className="flex-shrink-0">
          <ScoreCircle score={parsedFeedback?.overallScore || 0} />
        </div>
      </div>
      {resumeUrl && (
        <div className="gradient-border animate-in fade-in duration-1000">
          <div className="w-full h-full">
            <Image
              src={resumeUrl}
              alt={resume.companyName || "Resume Image"}
              width={200}
              height={350}
              className="w-full object-cover rounded-lg"
              onError={() =>
                console.error("Failed to load image:", resume.imagePath)
              }
            />
          </div>
        </div>
      )}
    </Link>
  );
};

export default ResumeCard;

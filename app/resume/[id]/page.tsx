"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, use } from "react";
import back from "@/public/icons/back.svg";
import { usePuterStore } from "@/lib/puter";
import dummyresume from "@/public/images/resume-scan-2.gif";
import { AuthGuard } from "@/components/AuthGuard";
import Summary from "@/components/Summary";
import Ats from "@/components/Ats";
import Details from "@/components/Details";

const Resume = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { fs, kv } = usePuterStore();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);

      if (!resume) return;

      const data = JSON.parse(resume);

      const resumeBlog = await fs.read(data.resumePath);
      if (!resumeBlog) return;

      const pdfBlob = new Blob([resumeBlog], { type: "application/pdf" });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;

      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);

      // Safe feedback parsing with error handling
      const parsedFeedback = (() => {
        try {
          if (typeof data.feedback === "string") {
            // Check if feedback string is not empty and is valid
            if (!data.feedback || data.feedback.trim() === "") {
              console.warn("Empty feedback string for resume:", id);
              return null;
            }
            return JSON.parse(data.feedback);
          }
          return data.feedback || null;
        } catch (error) {
          console.error("Error parsing feedback for resume:", id, error);
          console.log("Problematic feedback value:", data.feedback);
          return null;
        }
      })();

      setFeedback(parsedFeedback);
    };
    loadResume();
  }, []);

  return (
    <AuthGuard>
      <main className="!pt-0">
        <nav className="resume-nav top-0 absolute w-full">
          <Link href={"/"} className="back-button">
            <Image
              src={back}
              alt="Back"
              width={24}
              height={24}
              className="w-2.5 h-2.5"
            />
            <span className="text-sm text-gray-800 font-semibold">
              Back to Homepage
            </span>
          </Link>
        </nav>
        <div className="flex flex-row w-full mt-10 max-lg:flex-col-reverse">
          <section className="feedback-section sticky">
            <h2 className="text-4xl text-black font-bold">Your Resume</h2>
            {imageUrl && resumeUrl && (
              <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-2xl:h-fit w-fit">
                <Link
                  href={resumeUrl}
                  target="_blank"
                  className="w-full h-full"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={imageUrl}
                    alt="Resume"
                    width={200}
                    height={200}
                    className="w-full h-full object-contain rounded-2xl"
                  />
                </Link>
              </div>
            )}
          </section>
          <section className="feedback-section">
            <h2 className="text-4xl text-black font-bold">Resume Review</h2>
            {feedback ? (
              <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                <Summary feedback={feedback} />
                <Ats
                  score={feedback.ATS?.score || 0}
                  suggestions={feedback.ATS?.tips || []}
                />
                <Details feedback={feedback} />
              </div>
            ) : (
              <div>
                <p>Loading feedback...</p>
                <Image
                  src={dummyresume}
                  alt="Loading"
                  width={200}
                  height={200}
                  className="w-full"
                />
              </div>
            )}
          </section>
        </div>
      </main>
    </AuthGuard>
  );
};

export default Resume;

import Link from "next/link";
import React from "react";
import ScoreCircle from "./ScoreCircle";
import Image from "next/image";

const ResumeCard = ({ resume }: { resume: Resume }) => {
  return (
    <Link
      href={`/resume/${resume.id}`}
      className="resume-card animate-in fade-in duration-1000"
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold !text-black break-words">
            {resume.companyName}
          </h2>
          <h3 className="text-lg text-gray-500 break-words">
            {resume.jobTitle}
          </h3>
        </div>
        <div className="flex-shrink-0">
          <ScoreCircle score={resume.feedback.overallScore} />
        </div>
      </div>
      <div className="gradient-border animate-in fade-in duration-1000">
        <div className="w-full h-full">
          <Image
            src={resume.imagePath}
            alt={resume.companyName || "Resume Image"}
            width={200}
            height={350}
            className="w-full object-cover rounded-lg"
          />
        </div>
      </div>
    </Link>
  );
};

export default ResumeCard;

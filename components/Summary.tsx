import React from "react";
import { cn } from "@/lib/utils";
import ScoreGauge from "./ScoreGauge";
import ScoreBadge from "./ScoreBadge";

const Category = ({ title, score }: { title: string; score: number }) => {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 rounded-lg border-l-4 bg-gray-50 gap-2 sm:gap-0",
        score >= 70
          ? "border-green-400 bg-green-50"
          : score >= 49
          ? "border-amber-400 bg-amber-50"
          : "border-red-400 bg-red-50"
      )}
    >
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center">
        <div
          className={cn(
            "w-3 h-3 rounded-full flex-shrink-0",
            score >= 70
              ? "bg-green-500"
              : score >= 49
              ? "bg-amber-500"
              : "bg-red-500"
          )}
        />
        <h4 className="text-base sm:text-lg font-semibold text-gray-900">
          {title}
        </h4>
        <div className="sm:hidden">
          <ScoreBadge score={score} />
        </div>
      </div>
      <div className="flex flex-row justify-between sm:justify-end items-center gap-3">
        <div className="hidden sm:block">
          <ScoreBadge score={score} />
        </div>
        <p className="text-lg sm:text-xl font-bold text-gray-700">
          {score}/100
        </p>
      </div>
    </div>
  );
};

const Summary = ({ feedback }: { feedback: Feedback | null }) => {
  if (!feedback) return null;

  const overallScore = feedback.overallScore || 0;

  return (
    <div
      className={cn(
        "rounded-2xl w-full bg-white p-8 flex flex-col gap-6 border-2 shadow-lg hover:shadow-xl transition-shadow duration-300",
        overallScore > 69
          ? "border-green-200 shadow-green-100/50"
          : overallScore > 49
          ? "border-amber-200 shadow-amber-100/50"
          : "border-red-200 shadow-red-100/50"
      )}
    >
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
          <div className="flex-shrink-0">
            <ScoreGauge score={overallScore} />
          </div>
          <div className="flex flex-col text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
              Your Resume Score
            </h3>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-gray-600">
          This score is based on the overall quality of your resume, including
          formatting, content, and ATS compatibility.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h4 className="text-lg font-semibold text-gray-900 mb-2">
          Category Breakdown
        </h4>
        <Category
          title="Tone & Style"
          score={feedback.toneAndStyle?.score || 0}
        />
        <Category title="Content" score={feedback.content?.score || 0} />
        <Category title="Structure" score={feedback.structure?.score || 0} />
        <Category title="Skills" score={feedback.skills?.score || 0} />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-800 font-medium">
          📊 Each category contributes to your overall resume effectiveness.
          Focus on improving lower-scoring areas first.
        </p>
      </div>
    </div>
  );
};
export default Summary;

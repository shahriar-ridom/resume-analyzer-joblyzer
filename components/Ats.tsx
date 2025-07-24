import { cn } from "@/lib/utils";
import ScoreBadge from "./ScoreBadge";

const ATS = ({
  score,
  suggestions,
}: {
  score: number;
  suggestions: { type: "good" | "improve"; tip: string }[];
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl w-full bg-white p-4 sm:p-6 lg:p-8 flex flex-col gap-4 sm:gap-6 border-2 shadow-lg hover:shadow-xl transition-shadow duration-300",
        score > 69
          ? "border-green-200 shadow-green-100/50"
          : score > 49
          ? "border-amber-200 shadow-amber-100/50"
          : "border-red-200 shadow-red-100/50"
      )}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
          <div
            className={cn(
              "p-3 rounded-full",
              score > 69
                ? "bg-green-100"
                : score > 49
                ? "bg-amber-100"
                : "bg-red-100"
            )}
          >
            <img
              src={
                score > 69
                  ? "/icons/ats-good.svg"
                  : score > 49
                  ? "/icons/ats-warning.svg"
                  : "/icons/ats-bad.svg"
              }
              alt="ATS"
              className="w-6 h-6 sm:w-8 sm:h-8"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
              ATS Score
            </h3>
            <p className="text-base sm:text-lg font-semibold text-gray-600">
              {score}/100
            </p>
          </div>
          <div className="sm:hidden">
            <ScoreBadge score={score} />
          </div>
        </div>
        <div className="hidden sm:block">
          <ScoreBadge score={score} />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
          <h4 className="font-semibold text-base sm:text-lg text-gray-900 mb-2">
            How well does your resume pass through Applicant Tracking Systems?
          </h4>
          <p className="text-sm sm:text-base text-gray-600">
            Your resume was scanned like an employer would. Here's how it
            performed:
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:gap-3">
          {suggestions.map((suggestion, index) => (
            <div
              className={cn(
                "flex flex-col sm:flex-row gap-2 sm:gap-3 items-start p-3 rounded-lg border-l-4",
                suggestion.type === "good"
                  ? "bg-green-50 border-green-400"
                  : "bg-orange-50 border-orange-400"
              )}
              key={index}
            >
              <img
                src={
                  suggestion.type === "good"
                    ? "/icons/check.svg"
                    : "/icons/warning.svg"
                }
                alt="suggestion type"
                className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0"
              />
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {suggestion.tip}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mt-2">
          <p className="text-sm sm:text-base text-blue-800 font-medium">
            💡 Want a better score? Improve your resume by applying the
            suggestions listed above.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ATS;

import { cn } from "@/lib/utils";
import ScoreBadge from "./ScoreBadge";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "@/components/Accordion";

const CategoryHeader = ({
  title,
  categoryScore,
}: {
  title: string;
  categoryScore: number;
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center py-2 sm:py-3">
      <p className="text-xl sm:text-2xl font-semibold text-gray-900">{title}</p>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

const CategoryContent = ({
  tips,
}: {
  tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
  return (
    <div className="flex flex-col gap-3 sm:gap-4 items-center w-full px-2 sm:px-0">
      <div className="bg-gray-50 w-full rounded-lg px-3 sm:px-5 py-3 sm:py-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {tips.map((tip, index) => (
          <div className="flex flex-row gap-2 items-center" key={index}>
            <img
              src={
                tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"
              }
              alt="score"
              className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
            />
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-medium">
              {tip.tip}
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3 sm:gap-4 w-full">
        {tips.map((tip, index) => (
          <div
            key={index + tip.tip}
            className={cn(
              "flex flex-col gap-2 sm:gap-3 rounded-lg sm:rounded-2xl p-3 sm:p-4 border-l-4",
              tip.type === "good"
                ? "bg-green-50 border-green-400 text-green-700"
                : "bg-amber-50 border-amber-400 text-amber-700"
            )}
          >
            <div className="flex flex-row gap-2 items-center">
              <img
                src={
                  tip.type === "good"
                    ? "/icons/check.svg"
                    : "/icons/warning.svg"
                }
                alt="score"
                className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
              />
              <p className="text-base sm:text-lg lg:text-xl font-semibold">
                {tip.tip}
              </p>
            </div>
            <p className="text-sm sm:text-base leading-relaxed pl-6 sm:pl-7">
              {tip.explanation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="rounded-2xl w-full bg-white p-4 sm:p-6 lg:p-8 flex flex-col gap-3 sm:gap-4 border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="border-b border-gray-200 pb-3 sm:pb-4 mb-2 sm:mb-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Detailed Feedback
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          Expand each section to see specific recommendations
        </p>
      </div>
      <Accordion>
        <AccordionItem id="tone-style">
          <AccordionHeader itemId="tone-style">
            <CategoryHeader
              title="Tone & Style"
              categoryScore={feedback.toneAndStyle.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="tone-style">
            <CategoryContent tips={feedback.toneAndStyle.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="content">
          <AccordionHeader itemId="content">
            <CategoryHeader
              title="Content"
              categoryScore={feedback.content.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="content">
            <CategoryContent tips={feedback.content.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="structure">
          <AccordionHeader itemId="structure">
            <CategoryHeader
              title="Structure"
              categoryScore={feedback.structure.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="structure">
            <CategoryContent tips={feedback.structure.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="skills">
          <AccordionHeader itemId="skills">
            <CategoryHeader
              title="Skills"
              categoryScore={feedback.skills.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="skills">
            <CategoryContent tips={feedback.skills.tips} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Details;

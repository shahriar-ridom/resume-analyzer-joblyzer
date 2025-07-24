interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  const getBadgeConfig = (score: number) => {
    if (score > 70) {
      return {
        text: "Strong",
        bgColor: "bg-green-100",
        textColor: "text-green-800",
        borderColor: "border-green-300",
      };
    } else if (score > 59) {
      return {
        text: "Good Start",
        bgColor: "bg-amber-100",
        textColor: "text-amber-800",
        borderColor: "border-amber-300",
      };
    } else {
      return {
        text: "Needs Work",
        bgColor: "bg-red-100",
        textColor: "text-red-800",
        borderColor: "border-red-300",
      };
    }
  };

  const { text, bgColor, textColor, borderColor } = getBadgeConfig(score);

  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full border-2 ${bgColor} ${borderColor}`}
    >
      <p className={`text-sm font-semibold ${textColor}`}>{text}</p>
    </div>
  );
};

export default ScoreBadge;

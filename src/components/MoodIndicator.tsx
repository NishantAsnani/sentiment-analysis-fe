import { Smile, Frown, Meh, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface MoodIndicatorProps {
  sentiment: "POSITIVE" | "NEGATIVE" | "NEUTRAL" | "MIXED";
  score: number;
}

const moodConfig = {
  POSITIVE: {
    icon: Smile,
    label: "Positive Mood",
    colorClass: "text-sentiment-positive",
    bgClass: "bg-sentiment-positive-light",
  },
  NEGATIVE: {
    icon: Frown,
    label: "Negative Mood",
    colorClass: "text-sentiment-negative",
    bgClass: "bg-sentiment-negative-light",
  },
  NEUTRAL: {
    icon: Meh,
    label: "Neutral Mood",
    colorClass: "text-sentiment-neutral",
    bgClass: "bg-sentiment-neutral-light",
  },
  MIXED: {
    icon: AlertCircle,
    label: "Mixed Mood",
    colorClass: "text-sentiment-mixed",
    bgClass: "bg-sentiment-mixed-light",
  },
};

export const MoodIndicator = ({ sentiment, score }: MoodIndicatorProps) => {
  const config = moodConfig[sentiment];
  const Icon = config.icon;

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <div className={cn("p-6 rounded-full", config.bgClass)}>
        <Icon className={cn("w-16 h-16", config.colorClass)} />
      </div>
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-1">{config.label}</h3>
        <p className="text-4xl font-extrabold" style={{ color: `hsl(var(--sentiment-${sentiment}))` }}>
          {score.toFixed(1)}
        </p>
        <p className="text-sm text-muted-foreground">Overall Score</p>
      </div>
    </div>
  );
};

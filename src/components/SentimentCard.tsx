import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SentimentCardProps {
  sentiment: "positive" | "negative" | "neutral" | "mixed";
  count: number;
  percentage: string;
  comments: string[];
}

const sentimentConfig = {
  positive: {
    label: "Positive",
    colorClass: "bg-sentiment-positive-light border-sentiment-positive text-sentiment-positive",
  },
  negative: {
    label: "Negative",
    colorClass: "bg-sentiment-negative-light border-sentiment-negative text-sentiment-negative",
  },
  neutral: {
    label: "Neutral",
    colorClass: "bg-sentiment-neutral-light border-sentiment-neutral text-sentiment-neutral",
  },
  mixed: {
    label: "Mixed",
    colorClass: "bg-sentiment-mixed-light border-sentiment-mixed text-sentiment-mixed",
  },
};

export const SentimentCard = ({ sentiment, count, percentage, comments }: SentimentCardProps) => {
  const config = sentimentConfig[sentiment];

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className={cn("border-l-4", config.colorClass)}>
        <CardTitle className="text-lg flex items-center justify-between">
          <span>{config.label}</span>
          <span className="text-2xl font-bold">{percentage}%</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{count} comments</p>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          {comments.slice(0, 3).map((comment, idx) => (
            <div
              key={idx}
              className="text-sm p-3 rounded-lg bg-secondary/50 border border-border"
            >
              "{comment}"
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

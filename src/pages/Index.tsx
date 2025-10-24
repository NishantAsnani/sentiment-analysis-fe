import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SentimentChart } from "@/components/SentimentChart";
import { SentimentCard } from "@/components/SentimentCard";
import { TrendChart } from "@/components/TrendChart";
import { WordCloud } from "@/components/WordCloud";
import { MoodIndicator } from "@/components/MoodIndicator";
import { Search, Youtube, Twitter } from "lucide-react";
import { toast } from "sonner";

// Mock data for demonstration
const mockData = {
  sentimentDistribution: [
    { name: "Positive", value: 45 },
    { name: "Negative", value: 15 },
    { name: "Neutral", value: 30 },
    { name: "Mixed", value: 10 },
  ],
  overallSentiment: "positive" as const,
  overallScore: 7.8,
  comments: {
    positive: [
      "This is absolutely amazing! Great work!",
      "Love this content, keep it up!",
      "Best video I've watched all week",
    ],
    negative: [
      "Not what I expected, disappointed",
      "Could be better honestly",
      "Didn't really enjoy this one",
    ],
    neutral: [
      "Interesting perspective on the topic",
      "Thanks for sharing this information",
      "Good points made here",
    ],
    mixed: [
      "Great visuals but audio could be improved",
      "Love the concept but execution needs work",
    ],
  },
  trendData: [
    { time: "0-2h", positive: 40, negative: 10, neutral: 25 },
    { time: "2-4h", positive: 45, negative: 12, neutral: 28 },
    { time: "4-6h", positive: 50, negative: 15, neutral: 30 },
    { time: "6-8h", positive: 48, negative: 18, neutral: 32 },
  ],
  keywords: [
    { text: "amazing", value: 45 },
    { text: "great", value: 38 },
    { text: "love", value: 35 },
    { text: "best", value: 28 },
    { text: "disappointing", value: 15 },
    { text: "interesting", value: 25 },
    { text: "informative", value: 22 },
    { text: "helpful", value: 30 },
  ],
};

const Index = () => {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = async () => {
    if (!url.trim()) {
      toast.error("Please enter a valid URL");
      return;
    }

    setIsAnalyzing(true);
    toast.info("Analyzing sentiment...");

    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
      toast.success("Analysis complete!");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-hero text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-extrabold mb-4 animate-fade-in">
            Sentiment Analysis Dashboard
          </h1>
          <p className="text-xl mb-8 text-white/90">
            Analyze YouTube videos and Twitter posts to understand audience sentiment
          </p>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Input
                    placeholder="Enter YouTube or Twitter URL..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="bg-white/90 border-white/30 h-12 pl-12 text-foreground"
                    onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex gap-2">
                    <Youtube className="w-5 h-5 text-red-500" />
                    <Twitter className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 font-semibold"
                >
                  {isAnalyzing ? (
                    "Analyzing..."
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Analyze
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Results Section */}
      {showResults && (
        <div className="container mx-auto max-w-7xl px-4 py-12 animate-fade-in">
          {/* Overall Sentiment & Distribution */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Overall Sentiment</CardTitle>
                <CardDescription>Aggregate audience mood</CardDescription>
              </CardHeader>
              <CardContent>
                <MoodIndicator
                  sentiment={mockData.overallSentiment}
                  score={mockData.overallScore}
                />
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Sentiment Distribution</CardTitle>
                <CardDescription>Breakdown of all comments</CardDescription>
              </CardHeader>
              <CardContent>
                <SentimentChart data={mockData.sentimentDistribution} />
              </CardContent>
            </Card>
          </div>

          {/* Top Comments by Sentiment */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-6">Top Comments</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <SentimentCard
                sentiment="positive"
                count={450}
                percentage={45}
                comments={mockData.comments.positive}
              />
              <SentimentCard
                sentiment="negative"
                count={150}
                percentage={15}
                comments={mockData.comments.negative}
              />
              <SentimentCard
                sentiment="neutral"
                count={300}
                percentage={30}
                comments={mockData.comments.neutral}
              />
              <SentimentCard
                sentiment="mixed"
                count={100}
                percentage={10}
                comments={mockData.comments.mixed}
              />
            </div>
          </div>

          {/* Trend Analysis */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Sentiment Trends Over Time</CardTitle>
              <CardDescription>How sentiment evolved throughout the comments</CardDescription>
            </CardHeader>
            <CardContent>
              <TrendChart data={mockData.trendData} />
            </CardContent>
          </Card>

          {/* Keyword Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Keyword Insights</CardTitle>
              <CardDescription>Most frequently mentioned words</CardDescription>
            </CardHeader>
            <CardContent>
              <WordCloud words={mockData.keywords} />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Empty State */}
      {!showResults && (
        <div className="container mx-auto max-w-4xl px-4 py-20 text-center">
          <div className="text-muted-foreground">
            <Search className="w-20 h-20 mx-auto mb-4 opacity-20" />
            <p className="text-xl">Enter a URL above to start analyzing sentiment</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;

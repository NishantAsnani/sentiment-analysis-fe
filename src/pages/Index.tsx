import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SentimentChart } from "@/components/SentimentChart";
import { SentimentCard } from "@/components/SentimentCard";
import { TrendChart } from "@/components/TrendChart";
import { WordCloud } from "@/components/WordCloud";
import { MoodIndicator } from "@/components/MoodIndicator";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UrlDropzone } from "@/components/UrlDropzone";
import { Search, Youtube, Twitter, Sparkles } from "lucide-react";
import { toast } from "sonner";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Index = () => {
  const [url, setUrl] = useState("https://youtube.com/watch?v=example");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(true); // Start with results visible
  const [mockData, setMockData] = useState({
    sentimentDistribution: [
      { name: "POSITIVE", value: 485 },
      { name: "NEGATIVE", value: 125 },
      { name: "NEUTRAL", value: 290 },
      { name: "MIXED", value: 100 },
    ],
    overallSentiment: "POSITIVE" as const,
    overallScore: 8.2,
    totalCount: 1000,
    comments: {
      positive: [
        "This is absolutely incredible! The production quality is off the charts! 🔥",
        "Best content I've seen all year! Keep pushing these boundaries!",
        "The attention to detail here is phenomenal. True masterpiece!",
        "Can't stop watching this! Shared it with everyone I know 👏",
        "Finally someone who gets it right. Instant subscribe!",
      ],
      negative: [
        "Not what I expected at all. Pretty disappointed with this one.",
        "The concept is good but execution leaves a lot to be desired.",
        "Could have been so much better. Feels rushed and incomplete.",
        "Missing the mark on this one. Hope the next one is better.",
      ],
      neutral: [
        "Interesting perspective on the topic. Worth watching.",
        "Thanks for sharing this information. Helpful overview.",
        "Good points made here. Pretty standard approach though.",
        "Decent content. Nothing groundbreaking but solid.",
        "Informative video covering the basics well.",
      ],
      mixed: [
        "Love the visuals and editing but the audio quality really needs work.",
        "Great concept and research but pacing is way too slow in parts.",
        "Some brilliant moments mixed with questionable choices.",
        "Excellent information but presentation could use improvement.",
      ],
    },
    keywords: [
      { text: "amazing", value: 128 },
      { text: "incredible", value: 115 },
      { text: "brilliant", value: 98 },
      { text: "love", value: 142 },
      { text: "best", value: 86 },
      { text: "excellent", value: 73 },
      { text: "perfect", value: 95 },
      { text: "awesome", value: 108 },
      { text: "disappointing", value: 35 },
      { text: "poor", value: 28 },
      { text: "boring", value: 22 },
      { text: "interesting", value: 67 },
      { text: "informative", value: 58 },
      { text: "helpful", value: 82 },
      { text: "quality", value: 91 },
      { text: "creative", value: 76 },
      { text: "inspiring", value: 63 },
      { text: "entertaining", value: 88 },
    ],
  });
  const handleAnalyze = async () => {
    if (!url.trim()) {
      toast.error("Please enter a valid URL");
      return;
    }

    setIsAnalyzing(true);
    setShowResults(false); // Hide previous results
    toast.info("Analyzing sentiment...");

    try {
      // Make API call to your backend
      const response = await fetch(
        `${backendUrl}/api/batch-analyze-sentiment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: url.trim(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Store the response in mockData
      setMockData(data.results);

      setShowResults(true);
      toast.success("Analysis complete!");
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
      toast.error("Failed to analyze sentiment. Please try again.");
      setShowResults(false);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleUrlDrop = (droppedUrl: string) => {
    setUrl(droppedUrl);
    toast.success("URL detected! Click Analyze to process.");
  };

  return (
    <div className="min-h-screen bg-background">
      <ThemeToggle />

      {/* Hero Section with Glow Effect */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-50" />
        <div
          className="absolute inset-0"
          style={{ boxShadow: "inset 0 0 100px rgba(139, 92, 246, 0.3)" }}
        />

        <div className="relative py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="mb-6 flex items-center justify-center gap-3 animate-fade-in">
              <Sparkles className="w-10 h-10 text-primary animate-pulse" />
              <h1 className="text-6xl font-extrabold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Sentiment Analysis
              </h1>
              <Sparkles className="w-10 h-10 text-accent animate-pulse" />
            </div>
            <p className="text-xl mb-8 text-foreground/80">
              AI-powered insights from YouTube with real-time
              visualization
            </p>

            <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-2xl">
              <CardContent className="p-6 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Enter YouTube or Twitter URL..."
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="bg-background/80 border-border/50 h-12 pl-12 focus:ring-2 focus:ring-primary/50 transition-all"
                      onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex gap-2">
                      <Youtube className="w-5 h-5 text-red-500" />
                      {/* <Twitter className="w-5 h-5 text-blue-400" /> */}
                    </div>
                  </div>
                  <Button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    size="lg"
                    className="bg-primary hover:bg-primary/90 font-semibold shadow-lg hover:shadow-primary/50 transition-all hover:scale-105"
                  >
                    {isAnalyzing ? (
                      <>
                        <span className="animate-pulse">Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5 mr-2" />
                        Analyze
                      </>
                    )}
                  </Button>
                </div>
                <UrlDropzone onUrlDrop={handleUrlDrop} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {showResults && (
        <div className="container mx-auto max-w-7xl px-4 py-12 space-y-8 animate-fade-in">
          {/* Overall Sentiment & Distribution */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/10 transition-all hover:scale-[1.02]">
              <CardHeader>
                <CardTitle className="text-2xl">Overall Sentiment</CardTitle>
                <CardDescription>
                  Aggregate audience mood analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MoodIndicator
                  sentiment={mockData?.overallSentiment}
                  score={mockData?.overallScore}
                />
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-accent/10 transition-all hover:scale-[1.02]">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Sentiment Distribution
                </CardTitle>
                <CardDescription>
                  Complete breakdown of{" "}
                  {mockData?.sentimentDistribution.reduce(
                    (a, b) => a + b.value,
                    0
                  )}{" "}
                  comments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SentimentChart data={mockData?.sentimentDistribution} />
              </CardContent>
            </Card>
          </div>

          {/* Top Comments by Sentiment */}
          <div>
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Top Comments Analysis
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <SentimentCard
                sentiment="positive"
                count={
                  mockData?.sentimentDistribution.find(
                    (ele) => ele.name == "POSITIVE"
                  ).value
                }
                percentage={(
                  ((mockData?.sentimentDistribution?.find(
                    (ele) => ele.name === "POSITIVE"
                  )?.value ?? 0) /
                    (mockData?.totalCount || 1)) *
                  100
                ).toFixed(1)}
                comments={mockData?.comments.positive}
              />
              <SentimentCard
                sentiment="negative"
                count={
                  mockData?.sentimentDistribution.find(
                    (ele) => ele.name == "NEGATIVE"
                  ).value
                }
                percentage={
                  (
                  ((mockData?.sentimentDistribution?.find(
                    (ele) => ele.name === "NEGATIVE"
                  )?.value ?? 0) /
                    (mockData?.totalCount || 1)) *
                  100
                ).toFixed(1)
                }
                comments={mockData?.comments.negative}
              />
              <SentimentCard
                sentiment="neutral"
                count={
                  mockData?.sentimentDistribution.find(
                    (ele) => ele.name == "NEUTRAL"
                  ).value
                }
                percentage={
                  (
                  ((mockData?.sentimentDistribution?.find(
                    (ele) => ele.name === "NEUTRAL"
                  )?.value ?? 0) /
                    (mockData?.totalCount || 1)) *
                  100
                ).toFixed(1)
                }
                comments={mockData?.comments.neutral}
              />
              <SentimentCard
                sentiment="mixed"
                count={
                  mockData?.sentimentDistribution.find(
                    (ele) => ele.name == "MIXED"
                  ).value
                }
                percentage={
                  (
                  ((mockData?.sentimentDistribution?.find(
                    (ele) => ele.name === "MIXED"
                  )?.value ?? 0) /
                    (mockData?.totalCount || 1)) *
                  100
                ).toFixed(1)
                }
                comments={mockData?.comments.mixed}
              />
            </div>
          </div>

          {/* Trend Analysis */}

          {/* Keyword Insights */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all">
            <CardHeader>
              <CardTitle className="text-2xl">
                Keyword Insights & Word Cloud
              </CardTitle>
              <CardDescription>
                {mockData?.keywords.length} most frequently mentioned words and
                phrases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WordCloud words={mockData?.keywords} />
            </CardContent>
          </Card>

          {/* Stats Footer */}
          <Card className="border-primary/50 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary">{mockData?.totalCount}</div>
                  <div className="text-sm text-muted-foreground">
                    Total Comments
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-sentiment-positive">
                    {mockData?.sentimentDistribution.find(
                    (ele) => ele.name == "POSITIVE"
                  ).value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Positive Reactions
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent">{mockData?.overallScore}/10</div>
                  <div className="text-sm text-muted-foreground">
                    Sentiment Score
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">{mockData?.keywords.length}</div>
                  <div className="text-sm text-muted-foreground">
                    Top Keywords
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;

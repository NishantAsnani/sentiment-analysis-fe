import { useState, useCallback } from "react";
import { Upload, Youtube, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

interface UrlDropzoneProps {
  onUrlDrop: (url: string) => void;
  className?: string;
}

export const UrlDropzone = ({ onUrlDrop, className }: UrlDropzoneProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const text = e.dataTransfer.getData("text");
      if (text && (text.includes("youtube.com") || text.includes("youtu.be") || text.includes("twitter.com") || text.includes("x.com"))) {
        onUrlDrop(text);
      }
    },
    [onUrlDrop]
  );

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "relative rounded-xl border-2 border-dashed transition-all duration-300",
        isDragging
          ? "border-primary bg-primary/10 scale-105 shadow-lg shadow-primary/20"
          : "border-border/50 hover:border-primary/50",
        className
      )}
    >
      <div className="flex items-center justify-center gap-3 p-4 text-muted-foreground">
        <Upload className={cn("w-5 h-5 transition-transform", isDragging && "scale-125")} />
        <span className="text-sm">
          {isDragging ? "Drop URL here" : "Or drag & drop URL"}
        </span>
        <div className="flex gap-2">
          <Youtube className="w-4 h-4 text-red-500" />
          <Twitter className="w-4 h-4 text-blue-400" />
        </div>
      </div>
    </div>
  );
};

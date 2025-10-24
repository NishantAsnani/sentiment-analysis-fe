interface WordCloudProps {
  words: Array<{
    text: string;
    value: number;
  }>;
}

export const WordCloud = ({ words }: WordCloudProps) => {
  const maxValue = Math.max(...words.map((w) => w.value));

  return (
    <div className="flex flex-wrap gap-4 justify-center items-center p-8 min-h-[300px]">
      {words.map((word, idx) => {
        const size = Math.max(14, (word.value / maxValue) * 56);
        const opacity = 0.6 + (word.value / maxValue) * 0.4;
        const hue = 220 + (idx * 15) % 140;

        return (
          <span
            key={idx}
            className="font-bold transition-all duration-300 hover:scale-125 cursor-default relative group"
            style={{
              fontSize: `${size}px`,
              opacity,
              color: `hsl(${hue}, 80%, 65%)`,
              textShadow: `0 0 20px hsl(${hue}, 80%, 65%, 0.5)`,
            }}
          >
            {word.text}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs bg-card border border-border rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {word.value} mentions
            </span>
          </span>
        );
      })}
    </div>
  );
};

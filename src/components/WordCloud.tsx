interface WordCloudProps {
  words: Array<{
    text: string;
    value: number;
  }>;
}

export const WordCloud = ({ words }: WordCloudProps) => {
  const maxValue = Math.max(...words.map((w) => w.value));

  return (
    <div className="flex flex-wrap gap-3 justify-center items-center p-6">
      {words.map((word, idx) => {
        const size = Math.max(12, (word.value / maxValue) * 48);
        const opacity = 0.5 + (word.value / maxValue) * 0.5;

        return (
          <span
            key={idx}
            className="font-semibold transition-all hover:scale-110 cursor-default"
            style={{
              fontSize: `${size}px`,
              opacity,
              color: `hsl(${262 + idx * 20}, 83%, 58%)`,
            }}
          >
            {word.text}
          </span>
        );
      })}
    </div>
  );
};

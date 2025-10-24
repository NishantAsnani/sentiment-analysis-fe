import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface SentimentChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
}

const COLORS = {
  Positive: "hsl(var(--sentiment-positive))",
  Negative: "hsl(var(--sentiment-negative))",
  Neutral: "hsl(var(--sentiment-neutral))",
  Mixed: "hsl(var(--sentiment-mixed))",
};

export const SentimentChart = ({ data }: SentimentChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          animationBegin={0}
          animationDuration={800}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface TrendChartProps {
  data: Array<{
    time: string;
    positive: number;
    negative: number;
    neutral: number;
  }>;
}

export const TrendChart = ({ data }: TrendChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="positive"
          stroke="hsl(var(--sentiment-positive))"
          strokeWidth={2}
          dot={{ fill: "hsl(var(--sentiment-positive))" }}
          animationDuration={800}
        />
        <Line
          type="monotone"
          dataKey="negative"
          stroke="hsl(var(--sentiment-negative))"
          strokeWidth={2}
          dot={{ fill: "hsl(var(--sentiment-negative))" }}
          animationDuration={800}
        />
        <Line
          type="monotone"
          dataKey="neutral"
          stroke="hsl(var(--sentiment-neutral))"
          strokeWidth={2}
          dot={{ fill: "hsl(var(--sentiment-neutral))" }}
          animationDuration={800}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

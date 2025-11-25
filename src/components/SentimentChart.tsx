import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface SentimentChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
}

const COLORS = {
  POSITIVE: "hsl(var(--sentiment-positive))",
  NEGATIVE: "hsl(var(--sentiment-negative))",
  NEUTRAL: "hsl(var(--sentiment-neutral))",
  MIXED: "hsl(var(--sentiment-mixed))",
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
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
          outerRadius={100}
          innerRadius={60}
          fill="#8884d8"
          dataKey="value"
          animationBegin={0}
          animationDuration={4000}
          paddingAngle={2}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={COLORS[entry.name as keyof typeof COLORS]}
              className="hover:opacity-80 transition-opacity cursor-pointer"
            />
          ))}
        </Pie>
        {/* <Tooltip 
          contentStyle={{ 
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px"
          }}
        /> */}
        <Legend wrapperStyle={{ paddingTop: "20px" }} />
      </PieChart>
    </ResponsiveContainer>
  );
};

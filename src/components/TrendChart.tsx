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
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <defs>
          <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--sentiment-positive))" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="hsl(var(--sentiment-positive))" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--sentiment-negative))" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="hsl(var(--sentiment-negative))" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorNeutral" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--sentiment-neutral))" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="hsl(var(--sentiment-neutral))" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} stroke="hsl(var(--border))" />
        <XAxis 
          dataKey="time" 
          stroke="hsl(var(--muted-foreground))"
          style={{ fontSize: "12px" }}
        />
        <YAxis 
          stroke="hsl(var(--muted-foreground))"
          style={{ fontSize: "12px" }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: "hsl(var(--card))", 
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            color: "hsl(var(--foreground))"
          }}
        />
        <Legend wrapperStyle={{ paddingTop: "10px" }} />
        <Line
          type="monotone"
          dataKey="positive"
          stroke="hsl(var(--sentiment-positive))"
          strokeWidth={3}
          dot={{ fill: "hsl(var(--sentiment-positive))", r: 5 }}
          activeDot={{ r: 8 }}
          animationDuration={1000}
          fill="url(#colorPositive)"
        />
        <Line
          type="monotone"
          dataKey="negative"
          stroke="hsl(var(--sentiment-negative))"
          strokeWidth={3}
          dot={{ fill: "hsl(var(--sentiment-negative))", r: 5 }}
          activeDot={{ r: 8 }}
          animationDuration={1000}
          fill="url(#colorNegative)"
        />
        <Line
          type="monotone"
          dataKey="neutral"
          stroke="hsl(var(--sentiment-neutral))"
          strokeWidth={3}
          dot={{ fill: "hsl(var(--sentiment-neutral))", r: 5 }}
          activeDot={{ r: 8 }}
          animationDuration={1000}
          fill="url(#colorNeutral)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

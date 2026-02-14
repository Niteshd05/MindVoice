"use client"

import { useEmotion } from "@/context/emotion-context"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const EMOTION_COLORS: Record<string, string> = {
  sadness: "#6366f1",
  neutral: "#94a3b8",
  surprise: "#f59e0b",
  disgust: "#84cc16",
  joy: "#22c55e",
  fear: "#a855f7",
  anger: "#ef4444",
}

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

const defaultData = [{ name: "Neutral", value: 100 }]

export function EmotionDistributionChart() {
  const { results } = useEmotion()

  // Aggregate emotions from all results
  const emotionMap = new Map<string, number>()

  results.forEach((result) => {
    result.emotions.forEach((emotion) => {
      const current = emotionMap.get(emotion.label) || 0
      emotionMap.set(emotion.label, current + emotion.score)
    })
  })

  const chartData =
    emotionMap.size > 0
      ? Array.from(emotionMap.entries())
          .map(([name, value]) => ({ name, value: Math.round(value * 100) }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 5)
      : defaultData

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={chartData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={EMOTION_COLORS[entry.name.toLowerCase()] || COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              color: "hsl(var(--foreground))",
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

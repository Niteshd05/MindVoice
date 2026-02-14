"use client"

import { useEmotion } from "@/context/emotion-context"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"

export function SentimentChart() {
  const { sentimentHistory } = useEmotion()

  const chartData = sentimentHistory.map((item, index) => ({
    name: index === 0 ? "Start" : `Analysis ${index}`,
    score: item.score,
  }))

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
          <YAxis domain={[0, 100]} stroke="#6b7280" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              color: "#111827",
            }}
          />
          <ReferenceLine y={50} stroke="#9ca3af" strokeDasharray="5 5" label="Neutral" />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#0ea5e9"
            strokeWidth={3}
            dot={{ fill: "#0ea5e9", r: 5 }}
            activeDot={{ r: 8, fill: "#0ea5e9" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"

export function AudioWaveform() {
  const [bars] = useState(() => Array.from({ length: 40 }, () => 0.5))
  const [animatedBars, setAnimatedBars] = useState(bars)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedBars((prev) =>
        prev.map((_, i) => {
          const base = bars[i]
          return base * (0.5 + Math.random() * 0.5)
        }),
      )
    }, 150)

    return () => clearInterval(interval)
  }, [bars])

  return (
    <div className="flex items-center justify-center gap-0.5 h-20 bg-secondary/50 rounded-xl p-4">
      {animatedBars.map((height, i) => (
        <div
          key={i}
          className="w-1 bg-primary rounded-full transition-all duration-150 ease-out"
          style={{ height: `${height * 100}%` }}
        />
      ))}
    </div>
  )
}

"use client"

import { useEmotion } from "@/context/emotion-context"
import { formatDistanceToNow } from "date-fns"

export function RecentAnalysesList() {
  const { results } = useEmotion()

  if (results.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No analyses yet. Upload an audio file to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {results.slice(0, 5).map((result) => (
        <div
          key={result.id}
          className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
        >
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{result.transcription.slice(0, 60)}...</p>
            <p className="text-xs text-muted-foreground mt-1">
              {formatDistanceToNow(result.timestamp, { addSuffix: true })}
            </p>
          </div>
          <div className="flex items-center gap-4 ml-4">
            <div className="text-right">
              <span className="text-sm font-medium text-primary capitalize">{result.textEmotion}</span>
              <p className="text-xs text-muted-foreground">Sentiment: {result.sentimentScore}%</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

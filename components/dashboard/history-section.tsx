"use client"

import { useEmotion } from "@/context/emotion-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDistanceToNow, format } from "date-fns"
import { Calendar, MessageCircle, Activity, TrendingUp } from "lucide-react"

export function HistorySection() {
  const { results, sentimentHistory } = useEmotion()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analysis History</h1>
        <p className="text-muted-foreground">View all your past emotion analyses</p>
      </div>

      {results.length === 0 ? (
        <Card className="bg-card border-border">
          <CardContent className="py-16 text-center">
            <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No History Yet</h3>
            <p className="text-muted-foreground">
              Your analysis history will appear here once you start analyzing audio files.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {results.map((result) => (
            <Card key={result.id} className="bg-card border-border hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-foreground flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    <span className="capitalize">{result.textEmotion}</span>
                  </CardTitle>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      {result.sentimentScore}%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {format(result.timestamp, "MMM d, yyyy HH:mm")}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Transcription</p>
                  <p className="text-foreground italic">{`"${result.transcription}"`}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-3 bg-secondary rounded-lg">
                    <p className="text-xs text-muted-foreground">Pitch</p>
                    <p className="font-medium text-foreground">{result.pitch.toFixed(2)} Hz</p>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg">
                    <p className="text-xs text-muted-foreground">Pitch Emotion</p>
                    <p className="font-medium text-foreground">{result.pitchEmotion}</p>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg">
                    <p className="text-xs text-muted-foreground">Analyzed</p>
                    <p className="font-medium text-foreground">
                      {formatDistanceToNow(result.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {result.emotions.slice(0, 5).map((emotion) => (
                    <span
                      key={emotion.label}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                    >
                      {emotion.label}: {(emotion.score * 100).toFixed(1)}%
                    </span>
                  ))}
                </div>

                <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">AI Response</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{result.response}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

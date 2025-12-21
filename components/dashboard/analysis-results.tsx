"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX, MessageCircle, Activity, BarChart3 } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

interface ApiResponse {
  transcription: string
  response: string
  response_data: {
    transcript: string
    pitch_analysis: {
      text_emotion: string
      pitch: number
      pitch_emotion: string
    }
    returned_json: Array<{
      chunk_id: number
      text: string
      emotions: Array<{ label: string; score: number }>
    }>
  }
}

interface AnalysisResultsProps {
  result: ApiResponse
  isSpeaking: boolean
  onToggleSpeech: () => void
}

const EMOTION_COLORS: Record<string, string> = {
  sadness: "#6366f1",
  neutral: "#94a3b8",
  surprise: "#f59e0b",
  disgust: "#84cc16",
  joy: "#22c55e",
  fear: "#a855f7",
  anger: "#ef4444",
}

export function AnalysisResults({ result, isSpeaking, onToggleSpeech }: AnalysisResultsProps) {
  // Aggregate emotions from all chunks
  const aggregatedEmotions = result.response_data.returned_json.reduce(
    (acc, chunk) => {
      chunk.emotions.forEach((emotion) => {
        const existing = acc.find((e) => e.label === emotion.label)
        if (existing) {
          existing.score += emotion.score
        } else {
          acc.push({ ...emotion })
        }
      })
      return acc
    },
    [] as Array<{ label: string; score: number }>,
  )

  // Average the scores
  const numChunks = result.response_data.returned_json.length
  aggregatedEmotions.forEach((emotion) => {
    emotion.score = emotion.score / numChunks
  })

  // Sort by score
  aggregatedEmotions.sort((a, b) => b.score - a.score)

  const chartData = aggregatedEmotions.map((emotion) => ({
    name: emotion.label.charAt(0).toUpperCase() + emotion.label.slice(1),
    value: Math.round(emotion.score * 100),
    fill: EMOTION_COLORS[emotion.label] || "#8884d8",
  }))

  const radarData = aggregatedEmotions.map((emotion) => ({
    subject: emotion.label.charAt(0).toUpperCase() + emotion.label.slice(1),
    score: Math.round(emotion.score * 100),
    fullMark: 100,
  }))

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* AI Response Card */}
      <Card className="bg-card border-border border-primary/20 shadow-lg shadow-primary/5">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-foreground">AI Response</CardTitle>
          </div>
          <Button variant="outline" size="sm" onClick={onToggleSpeech} className="gap-2 bg-transparent">
            {isSpeaking ? (
              <>
                <VolumeX className="h-4 w-4" />
                Stop
              </>
            ) : (
              <>
                <Volume2 className="h-4 w-4" />
                Listen
              </>
            )}
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed">{result.response}</p>
        </CardContent>
      </Card>

      {/* Transcription */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground text-lg">Transcription</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed italic">{`"${result.transcription}"`}</p>
        </CardContent>
      </Card>

      {/* Pitch Analysis */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Text Emotion</span>
            </div>
            <p className="text-2xl font-bold text-foreground capitalize">
              {result.response_data.pitch_analysis.text_emotion}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Pitch Value</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {result.response_data.pitch_analysis.pitch.toFixed(2)} Hz
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Pitch Emotion</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{result.response_data.pitch_analysis.pitch_emotion}</p>
          </CardContent>
        </Card>
      </div>

      {/* Emotion Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Emotion Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    width={80}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                    }}
                    formatter={(value) => [`${value}%`, "Score"]}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Emotion Radar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="subject" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={10} />
                  <Radar
                    name="Emotions"
                    dataKey="score"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chunk-by-Chunk Analysis */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Detailed Chunk Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {result.response_data.returned_json.map((chunk) => (
              <div key={chunk.chunk_id} className="p-4 bg-secondary/50 rounded-lg">
                <p className="text-sm text-foreground mb-3 italic">{`"${chunk.text}"`}</p>
                <div className="flex flex-wrap gap-2">
                  {chunk.emotions.slice(0, 4).map((emotion) => (
                    <span
                      key={emotion.label}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: `${EMOTION_COLORS[emotion.label]}20`,
                        color: EMOTION_COLORS[emotion.label],
                      }}
                    >
                      {emotion.label}: {(emotion.score * 100).toFixed(1)}%
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

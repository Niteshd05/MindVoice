"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { useEmotion } from "@/context/emotion-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Mic, Loader2, Play, Square } from "lucide-react"
import { AnalysisResults } from "@/components/dashboard/analysis-results"

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

export function AnalyzeSection() {
  const { addResult } = useEmotion()
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<ApiResponse | null>(null)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError(null)
      setAnalysisResult(null)
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data)
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        const audioFile = new File([audioBlob], "recording.wav", { type: "audio/wav" })
        setFile(audioFile)
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setError(null)
    } catch (err) {
      setError("Could not access microphone. Please grant permission.")
      console.error(err)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const calculateSentimentScore = (emotions: Array<{ label: string; score: number }>) => {
    const positiveEmotions = ["joy", "surprise"]
    const negativeEmotions = ["sadness", "anger", "fear", "disgust"]

    let positiveScore = 0
    let negativeScore = 0

    emotions.forEach((emotion) => {
      if (positiveEmotions.includes(emotion.label)) {
        positiveScore += emotion.score
      } else if (negativeEmotions.includes(emotion.label)) {
        negativeScore += emotion.score
      }
    })

    // Calculate sentiment: 50 is neutral, higher is positive, lower is negative
    const sentiment = 50 + (positiveScore - negativeScore) * 50
    return Math.max(0, Math.min(100, Math.round(sentiment)))
  }

  const analyzeAudio = async () => {
    if (!file) return

    setIsAnalyzing(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("choice", "1")
      formData.append("person", "doctor")

      const response = await fetch("https://codersmitramandal.shop/ayc/uploadaudio/", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Analysis failed. Please try again.")
      }

      const data: ApiResponse = await response.json()
      setAnalysisResult(data)

      // Aggregate all emotions from chunks
      const allEmotions = data.response_data.returned_json.flatMap((chunk) => chunk.emotions)
      const emotionMap = new Map<string, number>()
      allEmotions.forEach((emotion) => {
        const current = emotionMap.get(emotion.label) || 0
        emotionMap.set(emotion.label, current + emotion.score / data.response_data.returned_json.length)
      })
      const averagedEmotions = Array.from(emotionMap.entries()).map(([label, score]) => ({ label, score }))

      // Calculate sentiment score
      const sentimentScore = calculateSentimentScore(averagedEmotions)

      // Add to context
      addResult({
        transcription: data.transcription,
        response: data.response,
        textEmotion: data.response_data.pitch_analysis.text_emotion,
        pitch: data.response_data.pitch_analysis.pitch,
        pitchEmotion: data.response_data.pitch_analysis.pitch_emotion,
        emotions: averagedEmotions,
        sentimentScore,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const speakResponse = useCallback(() => {
    if (!analysisResult?.response) return

    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      return
    }

    const utterance = new SpeechSynthesisUtterance(analysisResult.response)
    utterance.rate = 0.9
    utterance.pitch = 1
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    setIsSpeaking(true)
    window.speechSynthesis.speak(utterance)
  }, [analysisResult, isSpeaking])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analyze Audio</h1>
        <p className="text-muted-foreground">Upload or record audio to detect emotions</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Upload Audio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div
              className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <input ref={fileInputRef} type="file" accept="audio/*" onChange={handleFileChange} className="hidden" />
              <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-foreground font-medium">Click to upload audio file</p>
              <p className="text-sm text-muted-foreground mt-1">WAV, MP3, M4A supported</p>
            </div>

            {file && (
              <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                <Play className="h-5 w-5 text-primary" />
                <span className="text-sm text-foreground truncate flex-1">{file.name}</span>
                <Button variant="ghost" size="sm" onClick={() => setFile(null)}>
                  Remove
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Record Live Audio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center justify-center py-8">
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
                  isRecording
                    ? "bg-destructive text-destructive-foreground animate-pulse"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {isRecording ? <Square className="h-10 w-10" /> : <Mic className="h-10 w-10" />}
              </button>
              <p className="text-muted-foreground mt-4">
                {isRecording ? "Recording... Click to stop" : "Click to start recording"}
              </p>
            </div>

            {isRecording && (
              <div className="flex items-center justify-center gap-1 h-12">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-primary rounded-full animate-wave"
                    style={{
                      height: `${20 + ((i * 7) % 60)}%`,
                      animationDelay: `${i * 50}ms`,
                    }}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={analyzeAudio}
          disabled={!file || isAnalyzing}
          className="px-12 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Analyze Audio"
          )}
        </Button>
      </div>

      {analysisResult && (
        <AnalysisResults result={analysisResult} isSpeaking={isSpeaking} onToggleSpeech={speakResponse} />
      )}
    </div>
  )
}

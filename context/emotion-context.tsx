"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface EmotionResult {
  id: string
  timestamp: Date
  transcription: string
  response: string
  textEmotion: string
  pitch: number
  pitchEmotion: string
  emotions: Array<{ label: string; score: number }>
  sentimentScore: number
}

interface EmotionContextType {
  results: EmotionResult[]
  addResult: (result: Omit<EmotionResult, "id" | "timestamp">) => void
  sentimentHistory: Array<{ timestamp: Date; score: number }>
  currentSentiment: number
}

const EmotionContext = createContext<EmotionContextType | undefined>(undefined)

export function EmotionProvider({ children }: { children: ReactNode }) {
  const [results, setResults] = useState<EmotionResult[]>([])
  const [sentimentHistory, setSentimentHistory] = useState<Array<{ timestamp: Date; score: number }>>([
    { timestamp: new Date(), score: 50 },
  ])
  const [currentSentiment, setCurrentSentiment] = useState(50)

  const addResult = (result: Omit<EmotionResult, "id" | "timestamp">) => {
    const newResult: EmotionResult = {
      ...result,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    }
    setResults((prev) => [newResult, ...prev])

    // Update sentiment history
    const newSentiment = result.sentimentScore
    setCurrentSentiment(newSentiment)
    setSentimentHistory((prev) => [...prev, { timestamp: new Date(), score: newSentiment }])
  }

  return (
    <EmotionContext.Provider value={{ results, addResult, sentimentHistory, currentSentiment }}>
      {children}
    </EmotionContext.Provider>
  )
}

export function useEmotion() {
  const context = useContext(EmotionContext)
  if (!context) {
    throw new Error("useEmotion must be used within an EmotionProvider")
  }
  return context
}

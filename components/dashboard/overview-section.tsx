"use client"

import { useEmotion } from "@/context/emotion-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Mic, TrendingUp, Brain } from "lucide-react"
import { SentimentChart } from "@/components/dashboard/charts/sentiment-chart"
import { EmotionDistributionChart } from "@/components/dashboard/charts/emotion-distribution-chart"
import { RecentAnalysesList } from "@/components/dashboard/recent-analyses-list"

export function OverviewSection() {
  const { results, currentSentiment, sentimentHistory } = useEmotion()

  const stats = [
    {
      title: "Total Analyses",
      value: results.length,
      icon: Mic,
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      title: "Current Sentiment",
      value: `${currentSentiment}%`,
      icon: Activity,
      change: currentSentiment >= 50 ? "Positive" : "Needs attention",
      changeType: currentSentiment >= 50 ? ("positive" as const) : ("neutral" as const),
    },
    {
      title: "Trend",
      value:
        sentimentHistory.length > 1
          ? sentimentHistory[sentimentHistory.length - 1].score >= sentimentHistory[sentimentHistory.length - 2].score
            ? "Improving"
            : "Declining"
          : "Stable",
      icon: TrendingUp,
      change: "This week",
      changeType: "neutral" as const,
    },
    {
      title: "AI Responses",
      value: results.length,
      icon: Brain,
      change: "Generated",
      changeType: "positive" as const,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Track your emotional journey and insights</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                  <p
                    className={`text-xs mt-1 ${
                      stat.changeType === "positive" ? "text-green-500" : "text-muted-foreground"
                    }`}
                  >
                    {stat.change}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Sentiment Score Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <SentimentChart />
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Emotion Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <EmotionDistributionChart />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Analyses</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentAnalysesList />
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { Mic, BarChart3, Shield, Zap, Brain, HeartPulse } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Mic,
    title: "Audio Analysis",
    description: "Upload or record audio to analyze emotional patterns in real-time with high accuracy.",
  },
  {
    icon: Brain,
    title: "AI-Powered Detection",
    description: "Advanced machine learning models detect subtle emotional cues in voice patterns.",
  },
  {
    icon: BarChart3,
    title: "Visual Insights",
    description: "Beautiful charts and visualizations help you understand emotional trends over time.",
  },
  {
    icon: HeartPulse,
    title: "Pitch Analysis",
    description: "Detailed pitch and tone analysis provides deeper understanding of emotional states.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your audio data is encrypted and never stored permanently on our servers.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get comprehensive emotion analysis results in seconds, not minutes.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Powerful Features for <span className="text-primary">Emotion Understanding</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            MindVoice combines cutting-edge AI with intuitive design to help you understand emotional patterns like
            never before.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group bg-card border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

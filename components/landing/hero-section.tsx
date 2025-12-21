"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mic, Waves, Sparkles } from "lucide-react"
import { AudioWaveform } from "@/components/landing/audio-waveform"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "1.5s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Emotion Analysis</span>
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: "100ms" }}
            >
              Understand Emotions <span className="text-primary">Through Voice</span>
            </h1>

            <p
              className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: "200ms" }}
            >
              MindVoice uses advanced AI to detect emotions from audio recordings, providing deep insights into
              emotional well-being and mental health.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: "300ms" }}
            >
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                >
                  Start Analyzing
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 bg-transparent">
                <Mic className="h-4 w-4" />
                Try Demo
              </Button>
            </div>

            <div
              className="flex items-center gap-8 justify-center lg:justify-start pt-4 animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: "400ms" }}
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center text-sm font-medium"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">2,500+</span> users trust MindVoice
              </div>
            </div>
          </div>

          <div className="relative animate-in fade-in zoom-in-95 duration-1000" style={{ animationDelay: "500ms" }}>
            <div className="relative bg-card rounded-3xl p-8 shadow-2xl border border-border">
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-full p-3 shadow-lg animate-float">
                <Waves className="h-6 w-6" />
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Mic className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Voice Analysis</p>
                    <p className="text-sm text-muted-foreground">Processing audio...</p>
                  </div>
                </div>

                <AudioWaveform />

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary rounded-xl p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Primary Emotion</p>
                    <p className="text-lg font-semibold text-foreground mt-1">Calm</p>
                    <div className="w-full h-2 bg-muted rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-primary rounded-full w-4/5 transition-all duration-1000" />
                    </div>
                  </div>
                  <div className="bg-secondary rounded-xl p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Confidence</p>
                    <p className="text-lg font-semibold text-foreground mt-1">87%</p>
                    <div className="w-full h-2 bg-muted rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-accent rounded-full w-[87%] transition-all duration-1000" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-4 shadow-xl border border-border animate-float-delayed">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Sentiment Score</p>
                  <p className="text-xs text-muted-foreground">+12% this week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

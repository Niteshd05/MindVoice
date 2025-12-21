"use client"

import { Upload, Cpu, LineChart, MessageCircle } from "lucide-react"

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Audio",
    description: "Record live audio or upload an existing audio file in any format.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "AI Processing",
    description: "Our AI analyzes voice patterns, pitch, and speech content for emotions.",
  },
  {
    icon: LineChart,
    step: "03",
    title: "Get Insights",
    description: "View detailed emotion breakdowns with confidence scores and visualizations.",
  },
  {
    icon: MessageCircle,
    step: "04",
    title: "AI Response",
    description: "Receive an empathetic AI-generated response based on detected emotions.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            How <span className="text-primary">MindVoice</span> Works
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Get started with emotion analysis in four simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div
              key={index}
              className="relative animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-border -translate-x-1/2 z-0">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
                </div>
              )}

              <div className="relative z-10 bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-colors">
                <div className="text-5xl font-bold text-primary/20 mb-4">{item.step}</div>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

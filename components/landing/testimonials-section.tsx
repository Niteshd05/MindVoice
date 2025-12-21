"use client"

import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Dr. Sarah Chen",
    role: "Clinical Psychologist",
    content: "MindVoice has revolutionized how I understand my patients' emotional states. The accuracy is remarkable.",
    rating: 5,
  },
  {
    name: "Michael Rodriguez",
    role: "Wellness Coach",
    content:
      "This tool helps me track emotional progress with clients over time. The visualizations are incredibly insightful.",
    rating: 5,
  },
  {
    name: "Emma Thompson",
    role: "HR Director",
    content: "We use MindVoice for employee wellness programs. It's helped us create a more empathetic workplace.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Trusted by <span className="text-primary">Professionals</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            See what mental health professionals and wellness experts say about MindVoice
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:shadow-lg transition-shadow animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground leading-relaxed mb-6">{`"${testimonial.content}"`}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

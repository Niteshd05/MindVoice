"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { OverviewSection } from "@/components/dashboard/overview-section"
import { AnalyzeSection } from "@/components/dashboard/analyze-section"
import { HistorySection } from "@/components/dashboard/history-section"
import { EmotionProvider } from "@/context/emotion-context"

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("overview")

  return (
    <EmotionProvider>
      <div className="min-h-screen bg-background flex">
        <DashboardSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6 overflow-auto">
            {activeSection === "overview" && <OverviewSection />}
            {activeSection === "analyze" && <AnalyzeSection />}
            {activeSection === "history" && <HistorySection />}
          </main>
        </div>
      </div>
    </EmotionProvider>
  )
}

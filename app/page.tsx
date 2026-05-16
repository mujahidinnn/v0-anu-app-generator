"use client"

import { useState, useCallback } from "react"
import { toast } from "sonner"
import { AnuButton } from "@/components/anu-button"
import { StatCards } from "@/components/stat-cards"
import { AnuFeed } from "@/components/anu-feed"
import { AbsurdChartDialog } from "@/components/absurd-chart-dialog"
import { UnfairClicker } from "@/components/unfair-clicker"
import { FortuneWidget } from "@/components/fortune-widget"
import { AnuModeToggle } from "@/components/anu-mode-toggle"
import { cn } from "@/lib/utils"

const philosophicalQuotes = [
  "Jika anu adalah anu, maka siapa yang sebenarnya meng-anu?",
  "Hidup itu seperti semicolon; kadang perlu, kadang tidak.",
  "Semakin kau tahu, semakin kau sadar kau tidak tahu anu.",
  "Dalam setiap bug, ada fitur yang tersembunyi.",
  "Waktu adalah ilusi, terutama deadline.",
  "Apa bedanya null dan undefined? Keduanya sama-sama kosong seperti hidupku.",
  "Di balik setiap console.log ada developer yang putus asa.",
  "Kopi adalah bukti bahwa Tuhan ingin kita bahagia... dan begadang.",
  "Merge conflict adalah ujian kesabaran tertinggi.",
  "It works on my machine adalah mantra paling sakral.",
]

const fontClasses = [
  "font-sans",
  "font-chaos",
  "font-serious",
  "font-mono",
]

// Helper function to add "...anu" suffix to text when anu mode is on
function anuify(text: string, isAnuMode: boolean): string {
  return isAnuMode ? `${text}...anu` : text
}

export default function AnuPage() {
  const [showChart, setShowChart] = useState(false)
  const [fontClass, setFontClass] = useState("font-sans")
  const [anuMode, setAnuMode] = useState(false)

  const triggerRandomEffect = useCallback(() => {
    const effect = Math.random()
    
    if (effect < 0.4) {
      // Show philosophical toast
      const quote = philosophicalQuotes[Math.floor(Math.random() * philosophicalQuotes.length)]
      toast(anuMode ? `${quote}...anu` : quote, {
        description: anuMode ? "— Anonim, mungkin...anu" : "— Anonim, mungkin",
        duration: 4000,
      })
    } else if (effect < 0.7) {
      // Change font
      const randomFont = fontClasses[Math.floor(Math.random() * fontClasses.length)]
      setFontClass(randomFont)
      toast(anuMode ? "Font berubah!...anu" : "Font berubah!", {
        description: anuMode 
          ? `Sekarang pake ${randomFont}. Kenapa? Anu...anu` 
          : `Sekarang pake ${randomFont}. Kenapa? Gatau.`,
        duration: 2000,
      })
    } else {
      // Show absurd chart
      setShowChart(true)
    }
  }, [anuMode])

  return (
    <main className={cn(
      "min-h-screen text-foreground transition-all duration-500",
      fontClass,
      anuMode ? "anu-mode-bg" : "bg-background"
    )}>
      {/* Subtle grid background */}
      <div className={cn(
        "fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none transition-opacity duration-500",
        anuMode && "opacity-50"
      )} />
      
      {/* Header */}
      <header className={cn(
        "relative border-b border-border/50 bg-background/80 backdrop-blur-sm transition-all duration-500",
        anuMode && "bg-transparent backdrop-blur-md anu-border"
      )}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className={cn(
                  "text-3xl font-bold text-primary transition-all duration-300",
                  anuMode && "anu-glow"
                )}>
                  Anu
                </span>
                <span className="absolute -top-1 -right-4 text-xs text-muted-foreground rotate-12">
                  {anuMode ? "v∞.?.?" : "v?.?.?"}
                </span>
              </div>
              <span className={cn(
                "text-xs text-muted-foreground hidden sm:inline-block border border-border/50 px-2 py-1 rounded transition-all duration-300",
                anuMode && "border-primary/50 text-primary"
              )}>
                Status: {anuMode ? "ANU MAKSIMAL" : "Anu"}
              </span>
            </div>
            <nav className="flex items-center gap-4">
              {/* Anu Mode Toggle */}
              <AnuModeToggle enabled={anuMode} onToggle={setAnuMode} />
              
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className={cn(
                    "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                    anuMode ? "bg-accent" : "bg-primary"
                  )}></span>
                  <span className={cn(
                    "relative inline-flex rounded-full h-2 w-2",
                    anuMode ? "bg-accent" : "bg-primary"
                  )}></span>
                </span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  {anuify("Online", anuMode)}
                </span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 py-8 space-y-12">
        
        {/* Hero Section with Button */}
        <section className="flex flex-col items-center justify-center py-16 md:py-24 space-y-8">
          <div className="text-center space-y-4 max-w-2xl">
            <h1 className={cn(
              "text-4xl md:text-6xl font-bold tracking-tight text-foreground transition-all duration-300",
              anuMode && "anu-glow"
            )}>
              {anuify("Welcome to", anuMode)} <span className="text-primary">Anu</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {anuify("Aplikasi untuk melakukan sesuatu. Apa? Anu. Kenapa? Anu juga", anuMode)}
              <span className="block mt-2 text-sm italic">
                {anuify("\"The app that does things, probably.\"", anuMode)}
              </span>
            </p>
          </div>
          
          {/* The Anu Button - slightly offset */}
          <div className="pt-8 transform translate-x-4 md:translate-x-8">
            <AnuButton onTriggerEffect={triggerRandomEffect} anuMode={anuMode} />
          </div>
          
          <p className="text-xs text-muted-foreground/70 animate-pulse">
            {anuify("↑ Pencet untuk pengalaman yang tidak bisa dijelaskan", anuMode)}
          </p>
        </section>

        {/* Stats Section */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className={cn(
              "text-2xl font-semibold text-foreground mb-2",
              anuMode && "anu-glow"
            )}>
              {anuify("Statistik Anu", anuMode)}
            </h2>
            <p className="text-sm text-muted-foreground">
              {anuify("Data real-time* yang sangat penting**", anuMode)}
            </p>
            <p className="text-xs text-muted-foreground/50 mt-1">
              {anuify("*mungkin **tidak", anuMode)}
            </p>
          </div>
          <div className="flex justify-center">
            <StatCards anuMode={anuMode} />
          </div>
        </section>

        {/* New Widgets Section - Game and Fortune */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className={cn(
              "text-2xl font-semibold text-foreground mb-2",
              anuMode && "anu-glow"
            )}>
              {anuify("Aktivitas Anu Interaktif", anuMode)}
            </h2>
            <p className="text-sm text-muted-foreground">
              {anuify("Mainkan dan ramal masa depan Anda (atau jangan)", anuMode)}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <UnfairClicker anuMode={anuMode} />
            <FortuneWidget anuMode={anuMode} />
          </div>
        </section>

        {/* Feed Section */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className={cn(
              "text-2xl font-semibold text-foreground mb-2",
              anuMode && "anu-glow"
            )}>
              {anuify("Aktivitas Anu Global", anuMode)}
            </h2>
            <p className="text-sm text-muted-foreground">
              {anuify("Lihat apa yang sedang di-anu-kan orang lain", anuMode)}
            </p>
          </div>
          <div className="flex justify-center">
            <AnuFeed anuMode={anuMode} />
          </div>
        </section>

        {/* Footer Info */}
        <footer className={cn(
          "text-center py-12 border-t border-border/30 transition-all duration-300",
          anuMode && "border-primary/30"
        )}>
          <p className="text-sm text-muted-foreground">
            {anuify("Built with confusion and too much caffeine", anuMode)}
          </p>
          <p className="text-xs text-muted-foreground/50 mt-2">
            {anuify("© 2026 Anu Corp. • All rights reserved (maybe) • Privacy: What privacy?", anuMode)}
          </p>
        </footer>
      </div>

      {/* Absurd Chart Dialog */}
      <AbsurdChartDialog open={showChart} onOpenChange={setShowChart} anuMode={anuMode} />
    </main>
  )
}

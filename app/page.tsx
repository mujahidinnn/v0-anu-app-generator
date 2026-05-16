"use client"

import { useState, useCallback } from "react"
import { toast } from "sonner"
import { AnuButton } from "@/components/anu-button"
import { StatCards } from "@/components/stat-cards"
import { AnuFeed } from "@/components/anu-feed"
import { AbsurdChartDialog } from "@/components/absurd-chart-dialog"
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

export default function AnuPage() {
  const [showChart, setShowChart] = useState(false)
  const [fontClass, setFontClass] = useState("font-sans")

  const triggerRandomEffect = useCallback(() => {
    const effect = Math.random()
    
    if (effect < 0.4) {
      // Show philosophical toast
      const quote = philosophicalQuotes[Math.floor(Math.random() * philosophicalQuotes.length)]
      toast(quote, {
        description: "— Anonim, mungkin",
        duration: 4000,
      })
    } else if (effect < 0.7) {
      // Change font
      const randomFont = fontClasses[Math.floor(Math.random() * fontClasses.length)]
      setFontClass(randomFont)
      toast("Font berubah!", {
        description: `Sekarang pake ${randomFont}. Kenapa? Gatau.`,
        duration: 2000,
      })
    } else {
      // Show absurd chart
      setShowChart(true)
    }
  }, [])

  return (
    <main className={cn(
      "min-h-screen bg-background text-foreground transition-all duration-500",
      fontClass
    )}>
      {/* Subtle grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
      
      {/* Header */}
      <header className="relative border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="text-3xl font-bold text-primary">Anu</span>
                <span className="absolute -top-1 -right-4 text-xs text-muted-foreground rotate-12">
                  v?.?.?
                </span>
              </div>
              <span className="text-xs text-muted-foreground hidden sm:inline-block border border-border/50 px-2 py-1 rounded">
                Status: Anu
              </span>
            </div>
            <nav className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden md:block">
                Mode: Chaotic Neutral
              </span>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  Online
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
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              Welcome to <span className="text-primary">Anu</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Aplikasi untuk melakukan sesuatu. Apa? Anu. Kenapa? Anu juga.
              <span className="block mt-2 text-sm italic">
                &quot;The app that does things, probably.&quot;
              </span>
            </p>
          </div>
          
          {/* The Anu Button - slightly offset */}
          <div className="pt-8 transform translate-x-4 md:translate-x-8">
            <AnuButton onTriggerEffect={triggerRandomEffect} />
          </div>
          
          <p className="text-xs text-muted-foreground/70 animate-pulse">
            ↑ Pencet untuk pengalaman yang tidak bisa dijelaskan
          </p>
        </section>

        {/* Stats Section */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Statistik Anu
            </h2>
            <p className="text-sm text-muted-foreground">
              Data real-time* yang sangat penting**
            </p>
            <p className="text-xs text-muted-foreground/50 mt-1">
              *mungkin **tidak
            </p>
          </div>
          <div className="flex justify-center">
            <StatCards />
          </div>
        </section>

        {/* Feed Section */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Aktivitas Anu Global
            </h2>
            <p className="text-sm text-muted-foreground">
              Lihat apa yang sedang di-anu-kan orang lain
            </p>
          </div>
          <div className="flex justify-center">
            <AnuFeed />
          </div>
        </section>

        {/* Footer Info */}
        <footer className="text-center py-12 border-t border-border/30">
          <p className="text-sm text-muted-foreground">
            Built with confusion and too much caffeine
          </p>
          <p className="text-xs text-muted-foreground/50 mt-2">
            © 2026 Anu Corp. • All rights reserved (maybe) • Privacy: What privacy?
          </p>
        </footer>
      </div>

      {/* Absurd Chart Dialog */}
      <AbsurdChartDialog open={showChart} onOpenChange={setShowChart} />
    </main>
  )
}

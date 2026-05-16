"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const moods = [
  { text: "Lagi Males", emoji: "😴", color: "text-muted-foreground" },
  { text: "Overthinking", emoji: "🤔", color: "text-chart-3" },
  { text: "Ceria Bingit", emoji: "✨", color: "text-primary" },
  { text: "Gabut Parah", emoji: "😶", color: "text-chart-4" },
  { text: "Existential Crisis", emoji: "🌀", color: "text-chart-2" },
  { text: "Ngantuk Tapi Gapisa Tidur", emoji: "😵", color: "text-destructive" },
  { text: "Vibing", emoji: "🎵", color: "text-primary" },
  { text: "Error 404: Mood Not Found", emoji: "🤖", color: "text-chart-5" },
]

export function StatCards() {
  const [anuCount, setAnuCount] = useState(42069)
  const [mood, setMood] = useState(moods[0])
  const [progress, setProgress] = useState(33)
  const [progressDirection, setProgressDirection] = useState(1)

  // Random anu counter
  useEffect(() => {
    const interval = setInterval(() => {
      setAnuCount(prev => {
        const change = Math.floor(Math.random() * 100) - 30
        return Math.max(0, prev + change)
      })
    }, 800)
    return () => clearInterval(interval)
  }, [])

  // Random mood changes
  useEffect(() => {
    const interval = setInterval(() => {
      const randomMood = moods[Math.floor(Math.random() * moods.length)]
      setMood(randomMood)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Chaotic progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        let newProgress = prev + (Math.random() * 15 - 5) * progressDirection
        
        if (newProgress >= 95) {
          setProgressDirection(-1)
          newProgress = 95
        } else if (newProgress <= 5) {
          setProgressDirection(1)
          newProgress = 5
        }
        
        return newProgress
      })
    }, 200)
    return () => clearInterval(interval)
  }, [progressDirection])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
      {/* Card 1: Anu Counter */}
      <Card className="animate-wobble border-primary/30 bg-card/80 backdrop-blur">
        <CardHeader className="pb-2">
          <CardDescription className="text-muted-foreground uppercase tracking-wider text-xs">
            Total Terdeteksi
          </CardDescription>
          <CardTitle className="text-sm font-medium text-foreground">
            {"Jumlah 'Anu'"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-primary font-mono tabular-nums">
              {anuCount.toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground animate-pulse">
              ± banyak
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Akurasi: Entahlah
          </p>
        </CardContent>
      </Card>

      {/* Card 2: Server Mood */}
      <Card className="border-chart-2/30 bg-card/80 backdrop-blur" style={{ animationDelay: "0.5s" }}>
        <CardHeader className="pb-2">
          <CardDescription className="text-muted-foreground uppercase tracking-wider text-xs">
            Real-time Analysis
          </CardDescription>
          <CardTitle className="text-sm font-medium text-foreground">
            Status Mood Server
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{mood.emoji}</span>
            <span className={cn("text-xl font-semibold", mood.color)}>
              {mood.text}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <p className="text-xs text-muted-foreground">
              Live • Bisa berubah sewaktu-waktu
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Card 3: Progress to Nowhere */}
      <Card className="border-chart-4/30 bg-card/80 backdrop-blur animate-float" style={{ animationDelay: "1s" }}>
        <CardHeader className="pb-2">
          <CardDescription className="text-muted-foreground uppercase tracking-wider text-xs">
            Perjalanan Tanpa Tujuan
          </CardDescription>
          <CardTitle className="text-sm font-medium text-foreground">
            Progress Menuju Entahlah
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Progress value={progress} className="h-3" />
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-accent font-mono">
                {progress.toFixed(1)}%
              </span>
              <span className="text-xs text-muted-foreground italic">
                Destination: ???
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              ETA: Antara sekarang dan tidak pernah
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

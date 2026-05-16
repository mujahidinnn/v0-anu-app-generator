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

interface StatCardsProps {
  anuMode?: boolean
}

function anuify(text: string, isAnuMode: boolean): string {
  return isAnuMode ? `${text}...anu` : text
}

export function StatCards({ anuMode = false }: StatCardsProps) {
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
      <Card className={cn(
        "animate-wobble border-primary/30 bg-card/80 backdrop-blur transition-all duration-300",
        anuMode && "anu-border"
      )}>
        <CardHeader className="pb-2">
          <CardDescription className="text-muted-foreground uppercase tracking-wider text-xs">
            {anuify("Total Terdeteksi", anuMode)}
          </CardDescription>
          <CardTitle className="text-sm font-medium text-foreground">
            {anuify("Jumlah 'Anu'", anuMode)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <span className={cn(
              "text-4xl font-bold text-primary font-mono tabular-nums",
              anuMode && "anu-glow"
            )}>
              {anuCount.toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground animate-pulse">
              {anuify("± banyak", anuMode)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {anuify("Akurasi: Entahlah", anuMode)}
          </p>
        </CardContent>
      </Card>

      {/* Card 2: Server Mood */}
      <Card className={cn(
        "border-chart-2/30 bg-card/80 backdrop-blur transition-all duration-300",
        anuMode && "anu-border"
      )} style={{ animationDelay: "0.5s" }}>
        <CardHeader className="pb-2">
          <CardDescription className="text-muted-foreground uppercase tracking-wider text-xs">
            {anuify("Real-time Analysis", anuMode)}
          </CardDescription>
          <CardTitle className="text-sm font-medium text-foreground">
            {anuify("Status Mood Server", anuMode)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{mood.emoji}</span>
            <span className={cn("text-xl font-semibold", mood.color)}>
              {anuify(mood.text, anuMode)}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2">
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
            <p className="text-xs text-muted-foreground">
              {anuify("Live • Bisa berubah sewaktu-waktu", anuMode)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Card 3: Progress to Nowhere */}
      <Card className={cn(
        "border-chart-4/30 bg-card/80 backdrop-blur animate-float transition-all duration-300",
        anuMode && "anu-border"
      )} style={{ animationDelay: "1s" }}>
        <CardHeader className="pb-2">
          <CardDescription className="text-muted-foreground uppercase tracking-wider text-xs">
            {anuify("Perjalanan Tanpa Tujuan", anuMode)}
          </CardDescription>
          <CardTitle className="text-sm font-medium text-foreground">
            {anuify("Progress Menuju Entahlah", anuMode)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Progress value={progress} className="h-3" />
            <div className="flex justify-between items-center">
              <span className={cn(
                "text-2xl font-bold text-accent font-mono",
                anuMode && "anu-glow"
              )}>
                {progress.toFixed(1)}%
              </span>
              <span className="text-xs text-muted-foreground italic">
                {anuify("Destination: ???", anuMode)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {anuify("ETA: Antara sekarang dan tidak pernah", anuMode)}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

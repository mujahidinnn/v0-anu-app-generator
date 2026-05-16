"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface UnfairClickerProps {
  anuMode: boolean
}

const angryMessages = [
  "WHAT?! You're giving up already?! Pathetic!",
  "Resetting? That's what a QUITTER would do!",
  "Oh sure, just reset when things get HARD!",
  "Your ancestors didn't survive for THIS!",
  "Even the button is disappointed in you right now.",
  "Fine. RESET. See if I care. (I do care. A lot.)",
]

export function UnfairClicker({ anuMode }: UnfairClickerProps) {
  const [score, setScore] = useState(0)
  const [buttonPosition, setButtonPosition] = useState({ x: 50, y: 50 })
  const [isShaking, setIsShaking] = useState(false)
  const [showAngryDialog, setShowAngryDialog] = useState(false)
  const [angryMessage, setAngryMessage] = useState("")
  const [clickCount, setClickCount] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleClick = useCallback(() => {
    setClickCount(prev => prev + 1)
    
    // Random score change - can be negative, fractional, or huge
    const randomEffects = [
      () => Math.floor(Math.random() * 100) - 30, // -30 to +70
      () => Math.random() * 10 - 5, // Fractional: -5 to +5
      () => 42, // The answer to everything
      () => -Math.floor(Math.random() * 50), // Always negative
      () => Math.floor(Math.random() * 1000), // Jackpot!
      () => 0.001, // Almost nothing
      () => Math.PI, // Pi for some reason
      () => -score * 0.5, // Lose half your score
      () => 69, // Nice
      () => 420, // Dank
    ]
    
    const effect = randomEffects[Math.floor(Math.random() * randomEffects.length)]
    const change = effect()
    setScore(prev => {
      const newScore = prev + change
      return Math.round(newScore * 1000) / 1000 // Keep 3 decimal places
    })

    // 10% chance to teleport the button
    if (Math.random() < 0.1) {
      const newX = Math.random() * 70 + 10 // 10-80%
      const newY = Math.random() * 60 + 20 // 20-80%
      setButtonPosition({ x: newX, y: newY })
    }
  }, [score])

  const handleReset = useCallback(() => {
    // Show angry dialog instead of resetting
    const message = angryMessages[Math.floor(Math.random() * angryMessages.length)]
    setAngryMessage(message)
    setShowAngryDialog(true)
    setIsShaking(true)
    setTimeout(() => setIsShaking(false), 2000)
  }, [])

  const actuallyReset = useCallback(() => {
    // After being scolded, reset but add random score
    setScore(Math.floor(Math.random() * 10) - 5)
    setButtonPosition({ x: 50, y: 50 })
    setClickCount(0)
    setShowAngryDialog(false)
  }, [])

  const formatScore = (s: number) => {
    if (Number.isInteger(s)) return s.toString()
    return s.toFixed(3)
  }

  return (
    <>
      <Card className={cn(
        "border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300",
        isShaking && "animate-bounce",
        anuMode && "border-primary/50"
      )}>
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-foreground">
            The Unfair Anu Clicker{anuMode ? "...anu" : ""}
          </CardTitle>
          <CardDescription>
            A game where the rules don&apos;t make sense{anuMode ? "...anu" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Score Display */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Skor Anu{anuMode ? "...anu" : ""}:
            </p>
            <p className={cn(
              "text-4xl font-bold tabular-nums transition-colors duration-300",
              score > 0 ? "text-primary" : score < 0 ? "text-destructive" : "text-foreground"
            )}>
              {formatScore(score)}
            </p>
            <p className="text-xs text-muted-foreground">
              Total clicks: {clickCount}{anuMode ? "...anu" : ""}
            </p>
          </div>

          {/* Game Area */}
          <div 
            ref={containerRef}
            className="relative h-48 rounded-lg border border-border/50 bg-background/50 overflow-hidden"
          >
            {/* Target Button */}
            <Button
              onClick={handleClick}
              className={cn(
                "absolute transition-all duration-300 ease-out bg-primary hover:bg-primary/90 text-primary-foreground",
                "transform -translate-x-1/2 -translate-y-1/2"
              )}
              style={{
                left: `${buttonPosition.x}%`,
                top: `${buttonPosition.y}%`,
              }}
            >
              KLIK ANU{anuMode ? "...anu" : ""}
            </Button>

            {/* Decorative elements */}
            <div className="absolute top-2 left-2 text-xs text-muted-foreground/50">
              Good luck{anuMode ? "...anu" : ""}
            </div>
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground/50">
              (you&apos;ll need it){anuMode ? "...anu" : ""}
            </div>
          </div>

          {/* Reset Button */}
          <Button
            variant="outline"
            onClick={handleReset}
            className="w-full border-destructive/50 text-destructive hover:bg-destructive/10"
          >
            Reset Skor (Jangan){anuMode ? "...anu" : ""}
          </Button>
        </CardContent>
      </Card>

      {/* Angry Dialog */}
      <Dialog open={showAngryDialog} onOpenChange={setShowAngryDialog}>
        <DialogContent className="sm:max-w-md bg-card border-destructive/50">
          <DialogHeader>
            <DialogTitle className="text-destructive text-center text-2xl">
              EXCUSE ME?!
            </DialogTitle>
            <DialogDescription className="text-center text-base pt-4">
              {angryMessage}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 pt-4">
            <Button
              variant="destructive"
              onClick={actuallyReset}
              className="animate-pulse"
            >
              Fine, I accept my shame and reset anyway
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowAngryDialog(false)}
            >
              I&apos;m sorry, I&apos;ll keep playing
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

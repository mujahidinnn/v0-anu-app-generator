"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const buttonLabels = [
  "Pencet Anu",
  "Jangan Di-anu",
  "Loading Sesuatu...",
  "Duh Kebas",
  "Anu-kan Aku",
  "Gatau Ini Apa",
  "Hmm...",
  "Coba Pencet",
  "Eh Tunggu",
  "Yaudah Sih",
  "Males Ah",
  "Anu Lagi?",
  "Why Not",
  "Mencurigakan",
  "Trust Me Bro",
]

interface AnuButtonProps {
  onTriggerEffect: () => void
  anuMode?: boolean
}

export function AnuButton({ onTriggerEffect, anuMode = false }: AnuButtonProps) {
  const [label, setLabel] = useState("Pencet Anu")
  const [isGlitching, setIsGlitching] = useState(false)
  const [rotation, setRotation] = useState(0)

  const getRandomLabel = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * buttonLabels.length)
    const baseLabel = buttonLabels[randomIndex]
    return anuMode ? `${baseLabel}...anu` : baseLabel
  }, [anuMode])

  const handleHover = useCallback(() => {
    setLabel(getRandomLabel())
    setRotation(Math.random() * 6 - 3)
  }, [getRandomLabel])

  const handleClick = useCallback(() => {
    setIsGlitching(true)
    setLabel(getRandomLabel())
    onTriggerEffect()
    
    setTimeout(() => {
      setIsGlitching(false)
    }, 300)
  }, [getRandomLabel, onTriggerEffect])

  return (
    <div className="relative">
      {/* Glow effect behind button */}
      <div 
        className={cn(
          "absolute inset-0 blur-xl opacity-50 rounded-full scale-110 transition-colors duration-500",
          anuMode ? "bg-accent" : "bg-primary"
        )}
        style={{ transform: `rotate(${rotation}deg)` }}
      />
      
      <Button
        size="lg"
        onClick={handleClick}
        onMouseEnter={handleHover}
        onMouseLeave={() => setRotation(0)}
        className={cn(
          "relative px-12 py-8 text-2xl font-bold transition-all duration-200",
          "bg-primary text-primary-foreground hover:bg-primary/90",
          "animate-pulse-neon rounded-xl",
          "hover:scale-105 active:scale-95",
          isGlitching && "animate-glitch",
          anuMode && "bg-gradient-to-r from-primary to-accent hover:opacity-90"
        )}
        style={{ 
          transform: `rotate(${rotation}deg) translateX(${Math.sin(rotation) * 10}px)`,
          transition: "transform 0.2s ease-out"
        }}
      >
        <span className="relative z-10">{label}</span>
      </Button>
    </div>
  )
}

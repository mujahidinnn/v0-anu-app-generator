"use client"

import { useState, useEffect, createContext, useContext, useCallback } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CaptchaContextType {
  triggerCaptcha: () => boolean // Returns true if captcha was triggered
}

const CaptchaContext = createContext<CaptchaContextType | null>(null)

export function useCaptcha() {
  const context = useContext(CaptchaContext)
  if (!context) {
    throw new Error("useCaptcha must be used within a CaptchaProvider")
  }
  return context
}

const captchaQuestions = [
  {
    question: "Click the button if you think John Doe is currently anu-ing his cat.",
    subtext: "We need to verify you understand the concept of 'anu'.",
  },
  {
    question: "Select all images that contain the smell of code.",
    subtext: "There are no images. This is a test of your sanity.",
  },
  {
    question: "Prove you're not a robot by explaining why semicolons matter.",
    subtext: "Actually, don't. We don't have time for that debate.",
  },
  {
    question: "If a developer pushes to production on Friday, are they a hero or a villain?",
    subtext: "There is no right answer. There is only chaos.",
  },
  {
    question: "Calculate the emotional damage of a merge conflict.",
    subtext: "Express your answer in units of 'anu'.",
  },
  {
    question: "Is Kevin currently in the database?",
    subtext: "Kevin is always in the database. Kevin IS the database.",
  },
  {
    question: "Verify that you have experienced existential dread while coding.",
    subtext: "If you haven't, you will.",
  },
]

interface CaptchaProviderProps {
  children: React.ReactNode
  anuMode: boolean
}

export function CaptchaProvider({ children, anuMode }: CaptchaProviderProps) {
  const [showCaptcha, setShowCaptcha] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(captchaQuestions[0])
  const [isVerifying, setIsVerifying] = useState(false)

  const triggerCaptcha = useCallback(() => {
    // 5% chance to show captcha
    if (Math.random() < 0.05) {
      const randomQuestion = captchaQuestions[Math.floor(Math.random() * captchaQuestions.length)]
      setCurrentQuestion(randomQuestion)
      setShowCaptcha(true)
      return true
    }
    return false
  }, [])

  const handleVerify = () => {
    setIsVerifying(true)
    // Fake verification delay
    setTimeout(() => {
      setIsVerifying(false)
      setShowCaptcha(false)
    }, 1500)
  }

  return (
    <CaptchaContext.Provider value={{ triggerCaptcha }}>
      {children}
      
      <Dialog open={showCaptcha} onOpenChange={setShowCaptcha}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-primary">
              <span className="text-2xl">🤖</span>
              Captcha dari Masa Depan{anuMode ? "...anu" : ""}
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
              {currentQuestion.question}{anuMode ? "...anu" : ""}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            <p className="text-sm text-muted-foreground italic">
              {currentQuestion.subtext}{anuMode ? "...anu" : ""}
            </p>

            {/* Fake image grid for visual effect */}
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "aspect-square rounded-md bg-muted/50 border border-border/50",
                    "flex items-center justify-center text-2xl",
                    "hover:border-primary/50 cursor-pointer transition-colors"
                  )}
                >
                  {["?", "anu", "🤷", "null", "NaN", "¯\\_(ツ)_/¯", "...", "404", "∞"][i]}
                </div>
              ))}
            </div>

            <Button
              onClick={handleVerify}
              disabled={isVerifying}
              className="w-full"
            >
              {isVerifying ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Verifying your humanity{anuMode ? "...anu" : "..."}
                </span>
              ) : (
                <>I am not anú{anuMode ? "...anu" : ""}</>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Protected by AnuCaptcha v∞.?.?{anuMode ? "...anu" : ""}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </CaptchaContext.Provider>
  )
}

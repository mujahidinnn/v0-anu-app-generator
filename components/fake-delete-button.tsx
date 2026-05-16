"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface FakeDeleteButtonProps {
  anuMode: boolean
}

export function FakeDeleteButton({ anuMode }: FakeDeleteButtonProps) {
  const [showDialog, setShowDialog] = useState(false)
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState<"deleting" | "blackout" | "gotcha" | "idle">("idle")

  const handleDelete = () => {
    setShowDialog(true)
    setStage("deleting")
    setProgress(0)

    // Simulate fake deletion progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        // Random progress jumps for dramatic effect
        const jump = Math.random() * 15 + 5
        return Math.min(prev + jump, 100)
      })
    }, 300)

    // After progress completes, go to blackout
    setTimeout(() => {
      clearInterval(progressInterval)
      setProgress(100)
      setTimeout(() => {
        setStage("blackout")
        // After 3 seconds of blackout, show gotcha message
        setTimeout(() => {
          setStage("gotcha")
        }, 3000)
      }, 500)
    }, 3500)
  }

  const handleClose = () => {
    setShowDialog(false)
    setStage("idle")
    setProgress(0)
  }

  const deletionMessages = [
    "Deleting your repository...",
    "Removing all traces of 'anu'...",
    "Contacting GitHub servers...",
    "Shredding your commits...",
    "Erasing your digital footprint...",
  ]

  const currentMessage = deletionMessages[Math.floor((progress / 100) * (deletionMessages.length - 1))]

  return (
    <>
      <Button
        variant="destructive"
        size="sm"
        onClick={handleDelete}
        className={cn(
          "fixed bottom-4 left-4 z-50 gap-2 shadow-lg shadow-destructive/30",
          "hover:shadow-destructive/50 transition-all duration-300",
          "animate-pulse hover:animate-none"
        )}
      >
        <Trash2 className="h-4 w-4" />
        DELETE ENTIRE ANU APP (DANGER){anuMode ? "...anu" : ""}
      </Button>

      <Dialog open={showDialog} onOpenChange={(open) => !open && stage === "gotcha" && handleClose()}>
        <DialogContent 
          className={cn(
            "sm:max-w-md transition-all duration-500",
            stage === "blackout" && "bg-black border-black",
            stage === "gotcha" && "bg-card border-primary"
          )}
          onInteractOutside={(e) => {
            if (stage !== "gotcha") e.preventDefault()
          }}
        >
          {stage === "deleting" && (
            <>
              <DialogHeader>
                <DialogTitle className="text-destructive text-center text-2xl flex items-center justify-center gap-2">
                  <span className="animate-spin">⚠️</span>
                  SYSTEM DELETION IN PROGRESS
                  <span className="animate-spin">⚠️</span>
                </DialogTitle>
                <DialogDescription className="text-center text-base pt-4 text-destructive/80">
                  {currentMessage}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <Progress value={progress} className="h-3" />
                <p className="text-center text-sm text-muted-foreground tabular-nums">
                  {Math.floor(progress)}% complete...
                </p>
                <p className="text-center text-xs text-destructive animate-pulse">
                  DO NOT CLOSE THIS WINDOW
                </p>
              </div>
            </>
          )}

          {stage === "blackout" && (
            <div className="h-48 flex items-center justify-center">
              <div className="text-black">.</div>
            </div>
          )}

          {stage === "gotcha" && (
            <>
              <DialogHeader>
                <DialogTitle className="text-primary text-center text-lg">
                  😏
                </DialogTitle>
                <DialogDescription className="text-center text-lg pt-4 text-foreground">
                  Canda anu. Jangan panik gitu lah.
                </DialogDescription>
              </DialogHeader>
              <div className="pt-4">
                <Button onClick={handleClose} className="w-full">
                  Ya ampun... {anuMode ? "...anu" : ""}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Full screen blackout overlay */}
      {stage === "blackout" && (
        <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center">
          <div className="animate-pulse text-transparent">.</div>
        </div>
      )}
    </>
  )
}

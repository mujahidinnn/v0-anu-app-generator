"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface UselessPollProps {
  anuMode: boolean
}

const pollQuestions = [
  "Is 'anu' a noun, verb, or an existential state of mind?",
  "Should Kevin be allowed to touch the database?",
  "Is a hotdog a sandwich?",
  "Does 'undefined' spark joy?",
  "Should we deploy on Friday?",
]

const pollOptions = [
  ["Noun", "Verb", "Existential Crisis"],
  ["Absolutely Not", "Maybe", "Let Him Cook"],
  ["Yes", "No", "I Refuse to Answer"],
  ["Always", "Never", "What is Joy?"],
  ["YOLO", "Never", "Only If Kevin Approves"],
]

export function UselessPoll({ anuMode }: UselessPollProps) {
  const [questionIndex, setQuestionIndex] = useState(0) // Default to 0 for SSR
  const [votes, setVotes] = useState([33, 33, 34])
  const [hasVoted, setHasVoted] = useState(false)
  const [hoveredOption, setHoveredOption] = useState<number | null>(null)
  const [voteCount, setVoteCount] = useState(5000)
  const animationRef = useRef<NodeJS.Timeout | null>(null)
  const [mounted, setMounted] = useState(false)

  // Initialize random values on client side only to avoid hydration mismatch
  useEffect(() => {
    setQuestionIndex(Math.floor(Math.random() * pollQuestions.length))
    setVoteCount(Math.floor(Math.random() * 9000) + 1000)
    setMounted(true)
  }, [])

  const question = pollQuestions[questionIndex]
  const options = pollOptions[questionIndex]

  // Rigged poll mechanism - when hovering, rig the results
  useEffect(() => {
    if (hoveredOption === null || hasVoted) {
      // Return to semi-random state
      if (animationRef.current) {
        clearInterval(animationRef.current)
      }
      return
    }

    // Make the LEAST logical option win when user hovers
    const leastLogicalIndex = hoveredOption === 2 ? 0 : 2 // Always favor the opposite extreme

    animationRef.current = setInterval(() => {
      setVotes(prev => {
        const newVotes = [...prev]
        // Boost the least logical option
        newVotes[leastLogicalIndex] = Math.min(newVotes[leastLogicalIndex] + Math.random() * 8, 70)
        // Reduce the hovered option
        newVotes[hoveredOption] = Math.max(newVotes[hoveredOption] - Math.random() * 5, 10)
        // Adjust middle option
        const remaining = 100 - newVotes[leastLogicalIndex] - newVotes[hoveredOption]
        newVotes[1 - (leastLogicalIndex === 0 ? 0 : 1) - (hoveredOption === 1 ? 1 : 0) + 1] = remaining
        
        // Normalize to 100%
        const total = newVotes.reduce((a, b) => a + b, 0)
        return newVotes.map(v => Math.round((v / total) * 100))
      })
    }, 150)

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current)
      }
    }
  }, [hoveredOption, hasVoted])

  // Background animation when not hovering
  useEffect(() => {
    if (!mounted || hoveredOption !== null || hasVoted) return

    const interval = setInterval(() => {
      setVotes(prev => {
        const newVotes = prev.map(v => {
          const change = (Math.random() - 0.5) * 10
          return Math.max(10, Math.min(50, v + change))
        })
        // Normalize
        const total = newVotes.reduce((a, b) => a + b, 0)
        return newVotes.map(v => Math.round((v / total) * 100))
      })
    }, 500)

    return () => clearInterval(interval)
  }, [mounted, hoveredOption, hasVoted])

  const handleVote = (index: number) => {
    setHasVoted(true)
    // Final rigged result - the option user clicked gets the lowest
    const finalVotes = [33, 33, 34]
    finalVotes[index] = 12
    finalVotes[(index + 1) % 3] = 45
    finalVotes[(index + 2) % 3] = 43
    setVotes(finalVotes)
  }

  return (
    <Card className={cn(
      "border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300",
      anuMode && "anu-border"
    )}>
      <CardHeader>
        <CardTitle className="text-lg text-foreground">
          Polling Suara Anu{anuMode ? "...anu" : ""}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {anuify(question, anuMode)}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Vote Bars */}
        <div className="space-y-3">
          {options.map((option, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-foreground">{anuify(option, anuMode)}</span>
                <span className={cn(
                  "tabular-nums font-semibold transition-all duration-200",
                  hoveredOption === index && !hasVoted && "text-destructive",
                  hasVoted && index !== votes.indexOf(Math.max(...votes)) && "text-muted-foreground"
                )}>
                  {votes[index]}%
                </span>
              </div>
              <div className="relative h-8 rounded-md overflow-hidden bg-muted/50">
                <div
                  className={cn(
                    "absolute inset-y-0 left-0 rounded-md transition-all duration-300 ease-out",
                    index === 0 && "bg-primary/80",
                    index === 1 && "bg-accent/80",
                    index === 2 && "bg-chart-3/80",
                    hoveredOption === index && !hasVoted && "opacity-50"
                  )}
                  style={{ width: `${votes[index]}%` }}
                />
                {!hasVoted && (
                  <Button
                    variant="ghost"
                    className="absolute inset-0 w-full h-full hover:bg-white/10 rounded-md"
                    onMouseEnter={() => setHoveredOption(index)}
                    onMouseLeave={() => setHoveredOption(null)}
                    onClick={() => handleVote(index)}
                  >
                    <span className="sr-only">Vote for {option}</span>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Status */}
        <div className="flex items-center justify-between pt-2 border-t border-border/30">
          <p className="text-xs text-muted-foreground">
            {hasVoted 
              ? anuify("Thanks for your meaningless vote!", anuMode)
              : anuify("Hover to see democracy in action", anuMode)
            }
          </p>
        <p className="text-xs text-muted-foreground tabular-nums">
          {voteCount} votes{anuMode ? "...anu" : ""}
        </p>
        </div>
      </CardContent>
    </Card>
  )
}

function anuify(text: string, isAnuMode: boolean): string {
  return isAnuMode ? `${text}...anu` : text
}

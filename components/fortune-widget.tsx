"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface FortuneWidgetProps {
  anuMode: boolean
}

const names = [
  "Michael", "Emily", "David", "Sarah", "James", "Emma", "Daniel", "Olivia",
  "Matthew", "Sophia", "Andrew", "Isabella", "Joshua", "Ava", "Christopher",
  "Mia", "William", "Charlotte", "Alexander", "Amelia", "Ryan", "Harper",
  "Nicholas", "Evelyn", "Tyler", "Abigail", "Brandon", "Ella", "Justin", "Scarlett",
  "Kevin", "Grace", "Brian", "Chloe", "Jason", "Victoria", "Eric", "Riley",
  "Steven", "Aria", "Charles", "Lily", "Robert", "Aubrey", "Thomas", "Zoey",
]

const fortunes = [
  (name: string, other: string) => 
    `${name}, today you will accidentally 'anu' a piece of bread. It will change your life forever.`,
  (name: string, other: string) => 
    `${name}, the stars indicate that your code will 'anu' itself by midnight. Back up everything.`,
  (name: string, other: string) => 
    `${name}, someone named ${other} is thinking about your 'anu' right now. Creepy? Yes. True? Also yes.`,
  (name: string, other: string) => 
    `${name}, you will encounter a mysterious error message that simply says 'anu'. Do not debug it.`,
  (name: string, other: string) => 
    `${name}, your lucky number today is 'anu'. Whatever that means mathematically.`,
  (name: string, other: string) => 
    `${name}, avoid ${other} today. They know what you did with that 'anu' last Tuesday.`,
  (name: string, other: string) => 
    `${name}, a forgotten 'anu' from your past will resurface. Prepare emotionally.`,
  (name: string, other: string) => 
    `${name}, ${other} has been secretly 'anu-ing' your commits. Check your git history.`,
  (name: string, other: string) => 
    `${name}, today's color is 'anu'. Wear it proudly. No one knows what color that is.`,
  (name: string, other: string) => 
    `${name}, the universe whispers: "Have you tried turning the 'anu' off and on again?"`,
  (name: string, other: string) => 
    `${name}, your coffee will taste like 'anu' today. This is neither good nor bad.`,
  (name: string, other: string) => 
    `${name}, expect an unexpected 'anu' from ${other}. It will arrive via carrier pigeon.`,
  (name: string, other: string) => 
    `${name}, your semicolons will rebel and become 'anu'. The compiler is confused.`,
  (name: string, other: string) => 
    `${name}, ${other} dreamt about your 'anu' last night. They refuse to explain why.`,
  (name: string, other: string) => 
    `${name}, a door will open. Behind it is just 'anu'. That's it. That's the fortune.`,
  (name: string, other: string) => 
    `${name}, your keyboard will type 'anu' every time you press spacebar. Embrace it.`,
  (name: string, other: string) => 
    `${name}, the WiFi password you've been searching for is literally just 'anu123'.`,
  (name: string, other: string) => 
    `${name}, ${other} will ask you about 'anu'. Pretend you know what they're talking about.`,
  (name: string, other: string) => 
    `${name}, retrograde Mercury suggests: maybe the real 'anu' was the friends we made along the way.`,
  (name: string, other: string) => 
    `${name}, a cat will stare at you today. It knows your 'anu'. Cats always know.`,
]

export function FortuneWidget({ anuMode }: FortuneWidgetProps) {
  const [fortune, setFortune] = useState<string | null>(null)
  const [isRevealing, setIsRevealing] = useState(false)
  const [userName, setUserName] = useState<string | null>(null)

  const generateFortune = useCallback(() => {
    setIsRevealing(true)
    
    // Dramatic delay
    setTimeout(() => {
      const name = names[Math.floor(Math.random() * names.length)]
      let otherName = names[Math.floor(Math.random() * names.length)]
      while (otherName === name) {
        otherName = names[Math.floor(Math.random() * names.length)]
      }
      
      const fortuneTemplate = fortunes[Math.floor(Math.random() * fortunes.length)]
      const generatedFortune = fortuneTemplate(name, otherName)
      
      setUserName(name)
      setFortune(generatedFortune)
      setIsRevealing(false)
    }, 1500)
  }, [])

  return (
    <Card className={cn(
      "border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden transition-all duration-500",
      anuMode && "border-accent/50"
    )}>
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-xl text-foreground">
          Ramalan Ke-Anu-An Hari Ini{anuMode ? "...anu" : ""}
        </CardTitle>
        <CardDescription>
          Discover what the &apos;anu&apos; has in store for you{anuMode ? "...anu" : ""}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Mystical decoration */}
        <div className="relative h-32 flex items-center justify-center">
          <div className={cn(
            "absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent",
            isRevealing && "animate-pulse"
          )} />
          
          {fortune && !isRevealing ? (
            <div className="relative px-4 text-center space-y-2">
              <p className="text-xs text-primary uppercase tracking-wider">
                For {userName}:
              </p>
              <p className="text-sm text-foreground leading-relaxed italic">
                &quot;{fortune}{anuMode ? "...anu" : ""}&quot;
              </p>
            </div>
          ) : isRevealing ? (
            <div className="text-center space-y-2">
              <div className="flex justify-center gap-1">
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
              </div>
              <p className="text-sm text-muted-foreground animate-pulse">
                Consulting the cosmic anu...
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center">
              Press the button to reveal your destiny{anuMode ? "...anu" : ""}
            </p>
          )}
        </div>

        <Button
          onClick={generateFortune}
          disabled={isRevealing}
          className={cn(
            "w-full bg-gradient-to-r from-primary to-accent text-primary-foreground",
            "hover:opacity-90 transition-opacity duration-300",
            isRevealing && "opacity-50 cursor-not-allowed"
          )}
        >
          {isRevealing ? "Meramal..." : "Ramal Saya"}{anuMode ? "...anu" : ""}
        </Button>

        <p className="text-xs text-center text-muted-foreground/70">
          *Fortunes are 100% accurate 0% of the time{anuMode ? "...anu" : ""}
        </p>
      </CardContent>
    </Card>
  )
}

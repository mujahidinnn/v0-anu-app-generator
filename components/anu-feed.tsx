"use client"

import { useState, useEffect, useCallback, useImperativeHandle, forwardRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const names = [
  "John Doe",
  "Alice Smith",
  "Bob Johnson",
  "Sarah Jenkins",
  "Mike Wilson",
  "Emma Davis",
  "Chris Brown",
  "Lisa Anderson",
  "David Martinez",
  "Jennifer Taylor",
  "Kevin Lee",
  "Amanda White",
  "Ryan Garcia",
  "Michelle Thompson",
  "Jason Moore",
]

const activities = [
  "baru saja meng-anu baris kode ke-42",
  "memutuskan untuk tidak meng-anu hari ini",
  "sedang anu-in database production",
  "berhasil meng-anu tanpa error",
  "lupa kenapa tadi mau anu",
  "overthinking tentang anu",
  "anu-nya sudah selesai tapi gatau hasilnya",
  "gagal meng-anu untuk ke-7 kalinya",
  "sedang mencari anu yang hilang",
  "sudah anu 5 menit yang lalu tapi baru sadar",
  "bingung mau anu yang mana dulu",
  "lagi anu sambil rebahan",
  "anu-nya stuck di 99%",
  "udah anu tapi ternyata salah file",
  "mau anu tapi keburu ngantuk",
]

const kevinActivities = [
  "Kevin is now anu-ing your database in the background.",
  "Kevin has started optimizing your queries... suspiciously.",
  "Kevin found something interesting in row 42069.",
  "Kevin is whispering to your database. It whispers back.",
  "Kevin deployed something. He won't say what.",
  "Kevin is debugging your dreams now.",
  "Kevin added himself as a foreign key to all tables.",
  "Kevin is running migrations. In parallel. Backwards.",
]

interface FeedItem {
  id: number
  name: string
  activity: string
  timestamp: string
  isKevin?: boolean
}

export interface AnuFeedRef {
  addKevinFeed: () => void
}

interface AnuFeedProps {
  anuMode?: boolean
}

function anuify(text: string, isAnuMode: boolean): string {
  return isAnuMode ? `${text}...anu` : text
}

export const AnuFeed = forwardRef<AnuFeedRef, AnuFeedProps>(function AnuFeed({ anuMode = false }, ref) {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([])

  const addKevinFeed = useCallback(() => {
    const kevinActivity = kevinActivities[Math.floor(Math.random() * kevinActivities.length)]
    const newItem: FeedItem = {
      id: Date.now(),
      name: "Kevin (Developer)",
      activity: kevinActivity,
      timestamp: "Just now",
      isKevin: true,
    }
    setFeedItems(prev => [newItem, ...prev.slice(0, 7)])
  }, [])

  useImperativeHandle(ref, () => ({
    addKevinFeed,
  }))

  // Generate initial feed
  useEffect(() => {
    const initialItems: FeedItem[] = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      name: names[Math.floor(Math.random() * names.length)],
      activity: activities[Math.floor(Math.random() * activities.length)],
      timestamp: getRandomTimestamp(),
    }))
    setFeedItems(initialItems)
  }, [])

  // Add new items periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const newItem: FeedItem = {
        id: Date.now(),
        name: names[Math.floor(Math.random() * names.length)],
        activity: activities[Math.floor(Math.random() * activities.length)],
        timestamp: "Baru saja",
      }
      
      setFeedItems(prev => [newItem, ...prev.slice(0, 7)])
    }, 4000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className={cn(
      "w-full max-w-4xl border-border/50 bg-card/60 backdrop-blur transition-all duration-300",
      anuMode && "anu-border"
    )}>
      <CardHeader className="border-b border-border/50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">
            {anuify("Live Anu Feed", anuMode)}
          </CardTitle>
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
              {anuify("Recording", anuMode)}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border/30">
          {feedItems.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                "px-6 py-4 transition-all duration-500",
                index === 0 && "bg-primary/5 animate-pulse",
                item.isKevin && "bg-accent/10 border-l-4 border-accent"
              )}
            >
              <p className="text-sm text-foreground leading-relaxed">
                <span className={cn(
                  "font-semibold",
                  item.isKevin ? "text-accent" : "text-primary",
                  anuMode && "anu-glow"
                )}>{item.name}</span>
                {" "}
                <span className="text-muted-foreground">
                  {item.isKevin ? item.activity : anuify(item.activity, anuMode)}.
                </span>
              </p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                {anuify(item.timestamp, anuMode)}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
})

function getRandomTimestamp(): string {
  const options = [
    "2 menit lalu",
    "5 menit lalu", 
    "7 menit lalu",
    "12 menit lalu",
    "Entah kapan",
    "Kemarin atau besok",
    "Di timeline lain",
  ]
  return options[Math.floor(Math.random() * options.length)]
}

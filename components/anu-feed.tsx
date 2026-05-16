"use client"

import { useState, useEffect } from "react"
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

interface FeedItem {
  id: number
  name: string
  activity: string
  timestamp: string
}

export function AnuFeed() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([])

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
    <Card className="w-full max-w-4xl border-border/50 bg-card/60 backdrop-blur">
      <CardHeader className="border-b border-border/50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">
            Live Anu Feed
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Recording
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
                index === 0 && "bg-primary/5 animate-pulse"
              )}
            >
              <p className="text-sm text-foreground leading-relaxed">
                <span className="font-semibold text-primary">{item.name}</span>
                {" "}
                <span className="text-muted-foreground">{item.activity}.</span>
              </p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                {item.timestamp}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

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

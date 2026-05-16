"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Card, CardContent } from "@/components/ui/card"
import { Store, Sparkles, RotateCcw, User } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface AnuShopProps {
  coins: number
  onSpendCoins: (amount: number) => void
  onAddKevinFeed: () => void
  anuMode: boolean
}

interface ShopItem {
  id: string
  name: string
  description: string
  price: number
  icon: React.ReactNode
  effect: () => void
}

export function AnuShop({ coins, onSpendCoins, onAddKevinFeed, anuMode }: AnuShopProps) {
  const [isGravityInverted, setIsGravityInverted] = useState(false)
  const [open, setOpen] = useState(false)

  const buyNothing = useCallback(() => {
    if (coins < 50) {
      toast.error("Koin tidak cukup!", {
        description: "Bahkan untuk membeli 'nothing' saja kamu tidak mampu.",
      })
      return
    }
    onSpendCoins(50)
    toast.success("Purchase Successful!", {
      description: "You successfully bought nothing. Thank you.",
    })
  }, [coins, onSpendCoins])

  const invertGravity = useCallback(() => {
    if (coins < 100) {
      toast.error("Koin tidak cukup!", {
        description: "Gravitasi mahal, bro.",
      })
      return
    }
    onSpendCoins(100)
    setIsGravityInverted(true)
    
    // Add class to body
    document.body.classList.add("rotate-180")
    
    toast.info("Gravity Inverted!", {
      description: "Everything is upside down for 5 seconds...",
    })

    setTimeout(() => {
      document.body.classList.remove("rotate-180")
      setIsGravityInverted(false)
      toast.success("Gravity Restored!", {
        description: "Back to normal... or is it?",
      })
    }, 5000)
  }, [coins, onSpendCoins])

  const hireKevin = useCallback(() => {
    if (coins < 500) {
      toast.error("Koin tidak cukup!", {
        description: "Kevin is expensive. He knows his worth.",
      })
      return
    }
    onSpendCoins(500)
    onAddKevinFeed()
    toast.success("Kevin Has Been Hired!", {
      description: "He's now doing... something... to your database.",
      duration: 5000,
    })
    setOpen(false)
  }, [coins, onSpendCoins, onAddKevinFeed])

  const shopItems: ShopItem[] = [
    {
      id: "nothing",
      name: "Buy Nothing",
      description: "Literally nothing. Zero. Nada. You will receive nothing in return.",
      price: 50,
      icon: <Sparkles className="h-5 w-5" />,
      effect: buyNothing,
    },
    {
      id: "gravity",
      name: "Invert Gravity",
      description: "Flip the entire page upside down for 5 seconds. Why? Why not.",
      price: 100,
      icon: <RotateCcw className="h-5 w-5" />,
      effect: invertGravity,
    },
    {
      id: "kevin",
      name: "Hire Developer Kevin",
      description: "Kevin will anu your database in the background. Trust him. (Don't).",
      price: 500,
      icon: <User className="h-5 w-5" />,
      effect: hireKevin,
    },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={cn(
            "gap-2 border-primary/50 hover:bg-primary/10",
            anuMode && "anu-border"
          )}
        >
          <Store className="h-4 w-4" />
          <span className="hidden sm:inline">Anu Shop</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Store className="h-5 w-5 text-primary" />
            The Anu Shop{anuMode ? "...anu" : ""}
          </SheetTitle>
          <SheetDescription>
            Spend your hard-earned $ANU coins on absolutely questionable items.
            {anuMode ? "...anu" : ""}
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6 space-y-4">
          {/* Balance Display */}
          <Card className="bg-primary/10 border-primary/30">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Your Balance</p>
              <p className="text-3xl font-bold text-primary tabular-nums">
                ${Math.floor(coins)} <span className="text-sm font-normal">ANU</span>
              </p>
            </CardContent>
          </Card>

          {/* Shop Items */}
          <div className="space-y-3">
            {shopItems.map((item) => {
              const canAfford = coins >= item.price
              const isGravityDisabled = item.id === "gravity" && isGravityInverted

              return (
                <Card 
                  key={item.id} 
                  className={cn(
                    "border-border/50 transition-all duration-300",
                    canAfford && !isGravityDisabled && "hover:border-primary/50 cursor-pointer",
                    !canAfford && "opacity-60"
                  )}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "p-2 rounded-lg",
                          canAfford ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                        )}>
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">
                            {item.name}{anuMode ? "...anu" : ""}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={item.effect}
                        disabled={!canAfford || isGravityDisabled}
                        className={cn(
                          "shrink-0",
                          !canAfford && "cursor-not-allowed"
                        )}
                      >
                        ${item.price}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Footer */}
          <p className="text-xs text-center text-muted-foreground pt-4">
            All purchases are final and completely useless.{anuMode ? "...anu" : ""}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  )
}

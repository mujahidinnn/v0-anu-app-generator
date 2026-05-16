"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface AnuModeToggleProps {
  enabled: boolean
  onToggle: (enabled: boolean) => void
}

export function AnuModeToggle({ enabled, onToggle }: AnuModeToggleProps) {
  return (
    <div className={cn(
      "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300",
      enabled && "bg-primary/10"
    )}>
      <Switch
        id="anu-mode"
        checked={enabled}
        onCheckedChange={onToggle}
        className={cn(
          enabled && "data-[state=checked]:bg-accent"
        )}
      />
      <Label 
        htmlFor="anu-mode" 
        className={cn(
          "text-sm cursor-pointer transition-colors duration-300",
          enabled ? "text-accent font-medium" : "text-muted-foreground"
        )}
      >
        <span className="hidden sm:inline">Aktifkan </span>
        Mode Anu{enabled ? "...anu" : ""}
      </Label>
    </div>
  )
}

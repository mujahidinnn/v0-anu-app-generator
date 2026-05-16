"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const chartData = [
  { day: "Sen", kegabutan: 85, gorengan: 3 },
  { day: "Sel", kegabutan: 45, gorengan: 7 },
  { day: "Rab", kegabutan: 92, gorengan: 2 },
  { day: "Kam", kegabutan: 30, gorengan: 12 },
  { day: "Jum", kegabutan: 78, gorengan: 5 },
  { day: "Sab", kegabutan: 100, gorengan: 15 },
  { day: "Min", kegabutan: 95, gorengan: 20 },
]

interface AbsurdChartDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AbsurdChartDialog({ open, onOpenChange }: AbsurdChartDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl text-foreground">
            Analisis Korelasi Penting
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Hubungan antara Tingkat Kegabutan dan Konsumsi Gorengan Mingguan 
            <span className="block mt-1 text-xs italic">
              *Data diambil dari sumber yang tidak bisa dipercaya
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="h-72 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="day" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--popover-foreground))",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Legend />
              <Bar 
                dataKey="kegabutan" 
                fill="hsl(var(--primary))" 
                name="Kegabutan (%)"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="gorengan" 
                fill="hsl(var(--accent))" 
                name="Gorengan (pcs)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Kesimpulan: Ada hubungan tapi gatau apa
        </p>
      </DialogContent>
    </Dialog>
  )
}

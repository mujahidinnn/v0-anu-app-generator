"use client"

import { useMemo } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const normalChartData = [
  { day: "Sen", kegabutan: 85, gorengan: 3 },
  { day: "Sel", kegabutan: 45, gorengan: 7 },
  { day: "Rab", kegabutan: 92, gorengan: 2 },
  { day: "Kam", kegabutan: 30, gorengan: 12 },
  { day: "Jum", kegabutan: 78, gorengan: 5 },
  { day: "Sab", kegabutan: 100, gorengan: 15 },
  { day: "Min", kegabutan: 95, gorengan: 20 },
]

// Generate chaotic data that looks like a tangled mess
const generateChaoticData = () => {
  const points = []
  for (let i = 0; i < 30; i++) {
    points.push({
      x: i,
      chaos1: Math.sin(i * 0.5) * 50 + Math.random() * 100 - 50 + Math.cos(i * 1.3) * 30,
      chaos2: Math.cos(i * 0.7) * 40 + Math.random() * 80 - 40 + Math.sin(i * 1.1) * 25,
      chaos3: Math.tan(i * 0.1) * 10 + Math.random() * 60 - 30,
      chaos4: Math.sin(i * 2) * 20 + Math.cos(i * 3) * 30 + Math.random() * 40,
    })
  }
  return points
}

interface AbsurdChartDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  anuMode?: boolean
}

export function AbsurdChartDialog({ open, onOpenChange, anuMode = false }: AbsurdChartDialogProps) {
  const chaoticData = useMemo(() => generateChaoticData(), [])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl text-foreground">
            {anuMode ? "ANALISIS KORELASI ANU MAKSIMAL...anu" : "Analisis Korelasi Penting"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {anuMode ? (
              <>
                Data yang sudah di-anu-kan sampai tidak berbentuk lagi
                <span className="block mt-1 text-xs italic">
                  *Grafik ini adalah representasi visual dari otak Anda saat ini...anu
                </span>
              </>
            ) : (
              <>
                Hubungan antara Tingkat Kegabutan dan Konsumsi Gorengan Mingguan 
                <span className="block mt-1 text-xs italic">
                  *Data diambil dari sumber yang tidak bisa dipercaya
                </span>
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="h-72 mt-4">
          {anuMode ? (
            // Chaotic tangled line chart
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chaoticData}>
                <CartesianGrid strokeDasharray="1 1" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="x" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={10}
                  tickFormatter={() => "?"}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={10}
                  tickFormatter={() => "anu"}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--popover-foreground))",
                  }}
                  labelFormatter={() => "Titik Anu"}
                  formatter={() => ["???", "Anu"]}
                />
                <Line 
                  type="natural" 
                  dataKey="chaos1" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={false}
                  name="Anu 1"
                />
                <Line 
                  type="natural" 
                  dataKey="chaos2" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={2}
                  dot={false}
                  name="Anu 2"
                />
                <Line 
                  type="natural" 
                  dataKey="chaos3" 
                  stroke="hsl(var(--chart-3))" 
                  strokeWidth={2}
                  dot={false}
                  name="Anu 3"
                />
                <Line 
                  type="natural" 
                  dataKey="chaos4" 
                  stroke="hsl(var(--chart-4))" 
                  strokeWidth={1.5}
                  dot={false}
                  name="Anu 4"
                  strokeDasharray="5 5"
                />
                <Legend formatter={() => "Anu"} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            // Normal bar chart
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={normalChartData}>
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
          )}
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          {anuMode 
            ? "Kesimpulan: Semuanya adalah anu dan tidak ada yang masuk akal...anu"
            : "Kesimpulan: Ada hubungan tapi gatau apa"
          }
        </p>
      </DialogContent>
    </Dialog>
  )
}

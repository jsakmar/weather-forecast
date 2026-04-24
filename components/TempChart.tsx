'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

export default function TempChart({ data }: any) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>

        <CartesianGrid stroke="transparent" />

        <XAxis
          dataKey="day"
          stroke="rgba(255,255,255,0.4)"
          tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
        />

        <YAxis
          stroke="rgba(255,255,255,0.2)"
          tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
        />

        <Tooltip
          contentStyle={{
            background: "rgba(30,30,30,0.8)",
            border: "none",
            borderRadius: "10px",
            color: "white",
          }}
        />

        <Line
          type="monotone"
          dataKey="max"
          stroke="#ffffff"
          strokeWidth={3}
          dot={false}
        />

        <Line
          type="monotone"
          dataKey="min"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth={2}
          dot={false}
        />

      </LineChart>
    </ResponsiveContainer>
  )
}

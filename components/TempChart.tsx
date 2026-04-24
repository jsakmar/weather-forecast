'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

export default function TempChart({ data }: any) {
  if (!data || data.length === 0) return null

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 text-white shadow-xl">

      <h2 className="mb-4 text-lg font-semibold tracking-wide">
        🌡 Temperature Trend
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />

          <XAxis
            dataKey="day"
            stroke="#ccc"
            tick={{ fill: "#ccc" }}
          />

          <YAxis
            stroke="#ccc"
            tick={{ fill: "#ccc" }}
            unit="°C"
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "none",
              borderRadius: "12px",
              color: "white",
            }}
            labelStyle={{ color: "#94a3b8" }}
          />

          <Line
            type="monotone"
            dataKey="max"
            stroke="#fb923c"
            strokeWidth={3}
            dot={{ r: 4 }}
            name="Max °C"
          />

          <Line
            type="monotone"
            dataKey="min"
            stroke="#38bdf8"
            strokeWidth={3}
            dot={{ r: 4 }}
            name="Min °C"
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

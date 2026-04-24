'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function TempChart({ data }: any) {
  if (!data || data.length === 0) {
    return <div className="text-white">No data</div>
  }

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/10">

      <h2 className="mb-4 font-semibold text-white">
        Temperature Trend
      </h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="day" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="max"
            stroke="#f97316"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="min"
            stroke="#38bdf8"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )

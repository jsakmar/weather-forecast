'use client'

import ForecastRow from './ForecastRow'

export default function ForecastList({ data }: { data: any[] }) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="text-center opacity-50 py-6">
        No forecast data
      </div>
    )
  }

  // ✅ compute once here (NOT inside each row)
  const globalMin = Math.min(...data.map((d) => d.min ?? 0))
  const globalMax = Math.max(...data.map((d) => d.max ?? 0))

  return (
    <div className="space-y-3">
      {data.map((day: any, i: number) => (
        <ForecastRow
          key={i}
          day={day}
          globalMin={globalMin}
          globalMax={globalMax}
        />
      ))}
    </div>
  )
}

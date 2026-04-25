'use client'

import WeatherIcon from '@/components/WeatherIcon'

export default function HourlyScroll({
  hours,
}: {
  hours: any[]
}) {
  if (!hours || hours.length === 0) return null

  return (
    <div className="overflow-x-auto flex gap-4 py-4">
      {hours.map((h, i) => (
        <div
          key={i}
          className="flex flex-col items-center min-w-[70px] bg-white/5 rounded-xl p-3"
        >
          {/* Time */}
          <span className="text-xs text-white/60">
            {h.time}
          </span>

          {/* ✅ FIXED ICON */}
          <WeatherIcon iconCode={h.iconCode} size={40} />

          {/* Temp */}
          <span className="text-sm font-medium">
            {h.temp}°
          </span>

          {/* Precip */}
          <span className="text-xs text-blue-300">
            {h.precip ?? 0}%
          </span>
        </div>
      ))}
    </div>
  )
}

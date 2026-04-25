'use client'

import WeatherIcon from '@/components/WeatherIcon'

export default function ForecastRow({
  day,
}: {
  day: any
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/10">
      
      {/* Day */}
      <div className="w-12">
        {day.day}
      </div>

      {/* ✅ FIXED ICON */}
      <WeatherIcon iconCode={day.iconCode} size={48} />

      {/* Narrative */}
      <div className="flex-1 px-4 text-sm text-white/70">
        {day.narrative}
      </div>

      {/* Temps */}
      <div className="text-right">
        <span className="mr-2 text-white/60">
          {day.min}°
        </span>
        <span>{day.max}°</span>
      </div>

    </div>
  )
}

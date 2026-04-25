'use client'

import WeatherIcon from '@/components/WeatherIcon'
import { getWindRotation } from '@/lib/wind'

export default function ForecastRow({ day }: any) {
  return (
    <div className="flex items-center py-5 border-b border-white/10 text-white">

      <div className="w-12 text-sm opacity-70">{day.day}</div>

      <WeatherIcon iconCode={day.iconCode} size={60} />

      <div className="flex-1 px-4 text-sm opacity-80">
        {day.narrative}
      </div>

      {/* PREMIUM RANGE */}
      <div className="w-48 mx-4">
        <div className="h-2 bg-white/10 rounded-full relative overflow-hidden">

          {/* gradient fill */}
          <div
            className="absolute h-2 rounded-full"
            style={{
              left: `${((day.min + 20) / 60) * 100}%`,
              width: `${((day.max - day.min) / 60) * 100}%`,
              background:
                'linear-gradient(90deg, #60a5fa, #22c55e, #f97316)',
            }}
          />

          {/* precipitation overlay */}
          <div
            className="absolute h-2 bg-blue-400/40"
            style={{
              width: `${day.precip}%`,
            }}
          />
        </div>

        <div className="text-xs text-blue-300 mt-1">
          {day.precip}% rain
        </div>
      </div>

      {/* WIND ARROW */}
      <div
        className="w-6 text-xl"
        style={{
          transform: `rotate(${getWindRotation(day.windDir)}deg)`,
        }}
      >
        ↑
      </div>

      <div className="w-16 text-right font-medium">
        {day.min}° {day.max}°
      </div>
    </div>
  )
}

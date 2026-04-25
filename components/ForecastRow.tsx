'use client'

import WeatherIcon from '@/components/WeatherIcon'
import { getWindRotation } from '@/lib/wind'

export default function ForecastRow({ day }: any) {
  return (
    <div className="flex items-center py-4 border-b border-white/10 text-white">

      <div className="w-12">{day.day}</div>

      <WeatherIcon iconCode={day.iconCode} size={40} />

      <div className="flex-1 px-4 text-sm opacity-80">
        {day.narrative}
      </div>

      {/* RANGE BAR */}
      <div className="w-40 mx-4">
        <div className="h-1 bg-white/10 rounded-full relative">
          <div
            className="absolute h-1 bg-gradient-to-r from-blue-400 to-orange-400 rounded-full"
            style={{
              left: `${((day.min + 20) / 60) * 100}%`,
              width: `${((day.max - day.min) / 60) * 100}%`,
            }}
          />
        </div>

        <div className="text-xs text-blue-300 mt-1">
          {day.precip}%
        </div>
      </div>

      {/* WIND */}
      <div
        className="w-6 text-center"
        style={{
          transform: `rotate(${getWindRotation(day.windDir)}deg)`,
        }}
      >
        ↑
      </div>

      <div className="w-16 text-right">
        {day.min}° {day.max}°
      </div>
    </div>
  )
}

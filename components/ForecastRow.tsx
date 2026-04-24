'use client'

import WeatherIcon from './WeatherIcon'

export default function ForecastRow({ day }: any) {
  const hour = new Date().getHours()
  const isNight = hour < 6 || hour > 18

  return (
    <div className="
      flex items-center justify-between
      py-4 px-2
      border-b border-white/10
    ">

      {/* Day */}
      <div className="w-14 text-sm font-medium">
        {day.day}
      </div>

      {/* Icon */}
      <WeatherIcon
        condition={day.narrative}
        isNight={isNight}
        size={64}
      />

      {/* Description */}
      <div className="flex-1 px-4 text-sm text-slate-300">
        {day.narrative}
      </div>

      {/* Temps */}
      <div className="flex items-center gap-2 text-sm">
        <span className="opacity-60">{day.min}°</span>
        <span className="font-semibold">{day.max}°</span>
      </div>

    </div>
  )
}

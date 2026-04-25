'use client'

import WeatherIcon from '@/components/WeatherIcon'

export default function ForecastRow({
  day,
  globalMin,
  globalMax,
}: {
  day: any
  globalMin: number
  globalMax: number
}) {
  const min = day?.min ?? 0
  const max = day?.max ?? 0

  const range = globalMax - globalMin || 1

  const left = ((min - globalMin) / range) * 100
  const width = ((max - min) / range) * 100

  return (
    <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl">
      {/* Day */}
      <div className="w-10">{day?.day}</div>

      {/* Icon */}
      <WeatherIcon
        condition={day?.narrative}
        iconCode={day?.iconCode}
        size={28}
      />

      {/* Text */}
      <div className="flex-1 px-3 text-sm opacity-80 truncate">
        {day?.narrative}
      </div>

      {/* MIN */}
      <div className="w-10 text-blue-300 text-right">
        {min}°
      </div>

      {/* BAR */}
      <div className="flex-1 mx-3 h-2 bg-white/10 rounded-full relative">
        <div
          className="absolute h-2 rounded-full"
          style={{
            left: `${left}%`,
            width: `${width}%`,
            background:
              'linear-gradient(90deg,#60a5fa,#22c55e,#f59e0b)',
          }}
        />
      </div>

      {/* MAX */}
      <div className="w-10 text-orange-300 text-right">
        {max}°
      </div>
    </div>
  )
}

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
  const precip = day?.precip ?? 0

  const range = globalMax - globalMin || 1
  const left = ((min - globalMin) / range) * 100
  const width = ((max - min) / range) * 100

  return (
    <div className="flex items-center gap-2 text-sm py-1.5">

      {/* DAY */}
      <div className="w-8 opacity-80">{day.day}</div>

      {/* ICON */}
      <WeatherIcon
        condition={day.narrative}
        iconCode={day.iconCode}
        size={20}
      />

      {/* PRECIP (important → visible) */}
      <div className="w-10 text-blue-400 text-xs text-center font-medium">
        {precip > 0 ? `${precip}%` : ''}
      </div>

      {/* MIN */}
      <div className="w-8 text-blue-300 text-right">
        {min}°
      </div>

      {/* RANGE BAR */}
      <div className="flex-1 h-[3px] bg-white/10 rounded-full relative">
        <div
          className="absolute h-[3px] rounded-full"
          style={{
            left: `${left}%`,
            width: `${width}%`,
            background:
              'linear-gradient(90deg,#60a5fa,#22c55e,#f59e0b)',
          }}
        />
      </div>

      {/* MAX */}
      <div className="w-8 text-orange-300 text-right font-medium">
        {max}°
      </div>
    </div>
  )
}

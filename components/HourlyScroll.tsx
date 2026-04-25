'use client'

import WeatherIcon from './WeatherIcon'

type Hour = {
  time: string
  temp: number
  precip: number
  iconCode?: number
}

export default function HourlyScroll({ data }: { data: Hour[] }) {
  return (
    <div className="overflow-x-auto no-scrollbar py-4">
      <div className="flex gap-6 px-2 min-w-max">
        {data.map((h, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-xs text-white/80"
          >
            <span>{h.time}</span>

            <WeatherIcon condition={String(h.iconCode)} size={40} />

            <span className="text-sm font-medium">{h.temp}°</span>

            <span className="text-blue-300">{h.precip}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

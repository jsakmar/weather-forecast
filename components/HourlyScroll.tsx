'use client'

import WeatherIcon from '@/components/WeatherIcon'

export default function HourlyScroll({ hours }: any) {
  return (
    <div className="overflow-x-auto flex gap-4 py-4 text-white">
      {hours.map((h: any, i: number) => (
        <div key={i} className="min-w-[70px] flex flex-col items-center">
          <span>{h.time}</span>
          <WeatherIcon iconCode={h.iconCode} size={32} />
          <span>{h.temp}°</span>

          {/* precipitation mini bar */}
          <div className="w-full h-1 bg-white/10 mt-2 relative">
            <div
              className="absolute bg-blue-400 h-1"
              style={{ width: `${h.precip}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

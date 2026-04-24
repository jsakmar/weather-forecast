'use client'
import { useState } from "react"

function getIcon(code: number) {
  if ([32, 34].includes(code)) return "☀️"
  if ([30].includes(code)) return "🌤️"
  if ([26, 28].includes(code)) return "☁️"
  if ([12, 40].includes(code)) return "🌧️"
  if ([13, 16].includes(code)) return "❄️"
  return "🌡️"
}

export default function ForecastList({ data }: any) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (!data || data.length === 0) return null

  return (
    <div className="divide-y divide-white/10">

      {data.map((day: any, i: number) => {
        const isOpen = openIndex === i

        return (
          <div key={i}>

            {/* ROW (collapsed view) */}
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between py-4 text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm w-16 text-white/70">
                  {day.day}
                </span>
                <span className="text-xl">
                  {getIcon(day.icon)}
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm">

                <span className="text-white/60">
                  {day.min}°
                </span>

                {/* temp range bar */}
                <div className="w-24 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full"
                    style={{ width: `${Math.min(100, day.max * 3)}%` }}
                  />
                </div>

                <span className="font-medium text-white">
                  {day.max}°
                </span>

              </div>
            </button>

            {/* EXPANDED (full data) */}
            {isOpen && (
              <div className="pb-4 text-sm text-white/80 space-y-3">

                <p className="text-white/70">
                  {day.narrative}
                </p>

                <div className="grid grid-cols-2 gap-y-2 gap-x-6">

                  <div>🌧 Precip: {day.precipChance}%</div>
                  <div>💧 Humidity: {day.humidity}%</div>

                  <div>💨 Wind: {day.windSpeed} km/h</div>
                  <div>🧭 Direction: {day.windDir}</div>

                </div>

              </div>
            )}

          </div>
        )
      })}

    </div>
  )
}

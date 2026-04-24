'use client'

import { Sun, Cloud, CloudRain, Snowflake } from "lucide-react"

function getIcon(code: number) {
  if ([32, 34].includes(code)) return <Sun size={18} />
  if ([30].includes(code)) return <Cloud size={18} />
  if ([26, 28].includes(code)) return <Cloud size={18} />
  if ([12, 40].includes(code)) return <CloudRain size={18} />
  if ([13, 16].includes(code)) return <Snowflake size={18} />
  return <Cloud size={18} />
}

export default function ForecastList({ data }: any) {
  if (!data) return null

  const globalMin = Math.min(...data.map((d: any) => d.min))
  const globalMax = Math.max(...data.map((d: any) => d.max))

  return (
    <div className="divide-y divide-white/10">

      {data.map((day: any, i: number) => {

        const left =
          ((day.min - globalMin) / (globalMax - globalMin)) * 100

        const width =
          ((day.max - day.min) / (globalMax - globalMin)) * 100

        return (
          <div
            key={i}
            className="flex items-center justify-between py-4"
          >

            {/* LEFT */}
            <div className="flex items-center gap-4 w-[45%]">

              <span className="w-16 text-white font-medium">
                {day.day}
              </span>

              <span className="text-white">
                {getIcon(day.icon)}
              </span>

              <span className="text-sm text-white/70 truncate">
                {day.narrative}
              </span>

            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4 w-[55%] justify-end">

              {/* Precip */}
              <span className="text-xs text-blue-300 w-10 text-right">
                {day.precipChance}%
              </span>

              {/* Min */}
              <span className="text-sm text-white/50 w-8 text-right">
                {day.min}°
              </span>

              {/* Range bar */}
              <div className="relative w-28 h-1 bg-white/20 rounded-full">

                <div
                  className="absolute h-1 bg-white rounded-full"
                  style={{
                    left: `${left}%`,
                    width: `${width}%`,
                  }}
                />

              </div>

              {/* Max */}
              <span className="text-white font-semibold w-8">
                {day.max}°
              </span>

            </div>

          </div>
        )
      })}

    </div>
  )
}

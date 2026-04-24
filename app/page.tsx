'use client'

import { useEffect, useState } from 'react'

const BASE =
  "https://cdn.jsdelivr.net/gh/basmilius/weather-icons@2.0.0/production/fill/all/"

// ✅ SAFE ICON MAPPING
function getWeatherIcon(condition: string, isNight?: boolean) {
  const c = condition?.toLowerCase() || ""

  if (isNight) {
    if (c.includes('partly')) return 'partly-cloudy-night.svg'
    if (c.includes('clear') || c.includes('sun')) return 'clear-night.svg'
    return 'cloudy.svg'
  }

  if (c.includes('clear') || c.includes('sun')) return 'clear-day.svg'
  if (c.includes('partly')) return 'partly-cloudy-day.svg'
  if (c.includes('cloud')) return 'cloudy.svg'
  if (c.includes('rain') || c.includes('drizzle')) return 'rain.svg'
  if (c.includes('storm') || c.includes('thunder')) return 'thunderstorms.svg'
  if (c.includes('snow')) return 'snow.svg'
  if (c.includes('fog') || c.includes('mist')) return 'fog.svg'
  if (c.includes('wind')) return 'wind.svg'

  return 'cloudy.svg'
}

// 🧪 FALLBACK DATA (so UI ALWAYS shows)
const mockData = [
  { day: 'Fri', narrative: 'Partly cloudy', min: 6, max: 8, precip: 3 },
  { day: 'Sat', narrative: 'Partly sunny', min: 4, max: 12, precip: 24 },
  { day: 'Sun', narrative: 'Sunny', min: 2, max: 17, precip: 0 },
  { day: 'Mon', narrative: 'Cloudy', min: 0, max: 8, precip: 10 },
  { day: 'Tue', narrative: 'Rain', min: -2, max: 13, precip: 60 },
  { day: 'Wed', narrative: 'Windy', min: 1, max: 14, precip: 5 },
]

export default function Page() {
  const [data, setData] = useState<any[]>(mockData)

  const hour = new Date().getHours()
  const isNight = hour < 6 || hour > 18

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/weather')
        const json = await res.json()

        if (json?.forecast?.length) {
          setData(json.forecast)
        }
      } catch (e) {
        console.log('Using mock data')
      }
    }
    load()
  }, [])

  // 🌡 GLOBAL RANGE
  const globalMax = Math.max(...data.map(d => d.max))
  const globalMin = Math.min(...data.map(d => d.min))
  const range = globalMax - globalMin

  return (
    <main className="
      min-h-screen
      bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700
      text-white
      p-6
    ">

      {/* HEADER */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-light mb-2">Weather</h1>
        <p className="text-slate-300">Weekly forecast</p>
      </div>

      {/* CARD */}
      <div className="
        max-w-3xl mx-auto
        bg-white/10 backdrop-blur-xl
        rounded-2xl
        shadow-xl
        border border-white/10
        overflow-hidden
      ">

        {data.map((day, i) => {
          const icon = getWeatherIcon(day.narrative, isNight)

          const left = ((day.min - globalMin) / range) * 100
          const width = ((day.max - day.min) / range) * 100

          return (
            <div
              key={i}
              className="flex items-center gap-4 px-4 py-5 border-b border-white/10"
            >

              {/* DAY */}
              <div className="w-14 text-sm">{day.day}</div>

              {/* ICON */}
              <div className="w-14 flex justify-center bg-white/10 rounded-xl p-2">
                <img
                  src={`${BASE}${icon}`}
                  className="w-10 h-10 opacity-90"
                  alt=""
                />
              </div>

              {/* PRECIP */}
              <div className="w-12 text-xs text-sky-300 text-right">
                {day.precip ?? 0}%
              </div>

              {/* TEMP BAR */}
              <div className="flex-1 flex items-center gap-2">

                <span className="text-xs opacity-60 w-8 text-right">
                  {day.min}°
                </span>

                <div className="relative flex-1 h-2 bg-white/20 rounded-full">
                  <div
                    className="absolute h-2 rounded-full bg-gradient-to-r from-blue-400 to-yellow-300"
                    style={{
                      left: `${left}%`,
                      width: `${width}%`
                    }}
                  />
                </div>

                <span className="text-xs font-semibold w-8">
                  {day.max}°
                </span>

              </div>

            </div>
          )
        })}

      </div>

    </main>
  )
}

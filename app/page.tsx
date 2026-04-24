'use client'

import { useEffect, useState } from 'react'

const BASE =
  "https://cdn.jsdelivr.net/gh/basmilius/weather-icons@2.0.0/production/fill/all/"

// ✅ Safe icon mapping (NO broken icons)
function getWeatherIcon(condition: string, isNight?: boolean) {
  const c = condition?.toLowerCase() || ""

  // 🌙 Night (limited support in Meteocons)
  if (isNight) {
    if (c.includes('partly')) return 'partly-cloudy-night.svg'
    if (c.includes('clear') || c.includes('sun')) return 'clear-night.svg'
    return 'cloudy.svg'
  }

  // ☀️ Day
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

export default function Page() {
  const [data, setData] = useState<any[]>([])

  // 🌙 simple night detection
  const hour = new Date().getHours()
  const isNight = hour < 6 || hour > 18

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/weather') // adjust if needed
        const json = await res.json()
        setData(json.forecast || [])
      } catch (e) {
        console.error(e)
      }
    }
    load()
  }, [])

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

      {/* FORECAST CARD */}
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

          return (
            <div
              key={i}
              className="
                flex items-center gap-4
                px-4 py-5
                border-b border-white/10
              "
            >

              {/* DAY */}
              <div className="w-20 text-sm font-medium">
                {day.day}
              </div>

              {/* ICON (fixed visibility) */}
              <div className="
                w-16 flex justify-center
                bg-white/10 rounded-xl p-2
              ">
                <img
                  src={`${BASE}${icon}`}
                  className="w-12 h-12 object-contain opacity-90"
                  alt={day.narrative}
                />
              </div>

              {/* DESCRIPTION (no ugly wrapping) */}
              <div className="
                flex-1 text-sm text-slate-300
                truncate
              ">
                {day.narrative}
              </div>

              {/* TEMPERATURES */}
              <div className="
                w-24 text-right text-sm
                flex flex-col
              ">
                <span className="font-semibold">
                  {day.max}°
                </span>
                <span className="opacity-60">
                  {day.min}°
                </span>
              </div>

            </div>
          )
        })}

      </div>

    </main>
  )
}

'use client'

import { useEffect, useState } from 'react'
import ForecastRow from '@/components/ForecastRow'
import WeatherStats from '@/components/WeatherStats'

export default function Page() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch('/api/weather')
      .then(r => r.json())
      .then(setData)
  }, [])

  if (!data)
    return <div className="text-white p-10">Loading...</div>

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e3a8a] to-[#3b82f6] p-6">

      {/* HEADER */}
      <div className="text-center text-white mb-12">
        <h1 className="text-5xl font-thin tracking-wide">
          Weather
        </h1>
        <p className="opacity-60 mt-2">Ultra forecast</p>
      </div>

      {/* CURRENT */}
      <div className="text-center text-white mb-6">
        <div className="text-7xl font-thin drop-shadow-lg">
          {data.current.temp}°
        </div>
      </div>

      <WeatherStats current={data.current} />

      {/* FORECAST */}
      <div className="mt-10 bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl">
        {data.forecast.map((d: any, i: number) => (
          <ForecastRow key={i} day={d} />
        ))}
      </div>

    </div>
  )
}

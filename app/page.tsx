'use client'

import { useEffect, useState } from 'react'
import ForecastRow from '@/components/ForecastRow'
import WeatherStats from '@/components/WeatherStats'
import TempChart from '@/components/TempChart'
import RadarMap from '@/components/RadarMap'
import SunArc from '@/components/SunArc'

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
    <div className="min-h-screen relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#1e3a8a] to-[#3b82f6]" />
      <div className="absolute inset-0 backdrop-blur-2xl" />

      {/* CONTENT */}
      <div className="relative z-10 p-6">

        {/* HEADER */}
        <div className="text-center text-white mb-12">
          <h1 className="text-5xl font-thin">Weather</h1>
          <p className="opacity-60">Ultra forecast</p>
        </div>

        {/* LOCKSCREEN CARD */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 text-center text-white shadow-xl border border-white/10">
          <div className="text-7xl font-thin">
            {data.current.temp}°
          </div>
          <div className="text-sm opacity-60 mt-2">
            Feels like {data.current.feels}°
          </div>
        </div>

        {/* STATS */}
        <div className="mt-6">
          <WeatherStats current={data.current} />
        </div>

        {/* TEMP GRAPH */}
        <TempChart data={data.forecast} />

        {/* SUN ARC */}
        <SunArc />

        {/* FORECAST */}
        <div className="mt-10 bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl">
          {data.forecast.map((d: any, i: number) => (
            <ForecastRow key={i} day={d} />
          ))}
        </div>

        {/* MAP */}
        <RadarMap />

      </div>
    </div>
  )
}

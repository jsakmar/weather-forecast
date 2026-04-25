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

  if (!data) return <div className="p-10 text-white">Loading...</div>

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-500 p-6">

      {/* HEADER */}
      <div className="text-center text-white mb-10">
        <h1 className="text-4xl font-light">Weather</h1>
        <p className="opacity-70">Weekly forecast</p>
      </div>

      {/* CURRENT */}
      <div className="text-center text-white mb-6">
        <div className="text-6xl">{data.current.temp}°</div>
      </div>

      {/* STATS */}
      <WeatherStats current={data.current} />

      {/* FORECAST */}
      <div className="mt-8 bg-white/5 backdrop-blur-lg rounded-2xl p-4">
        {data.forecast.map((d: any, i: number) => (
          <ForecastRow key={i} day={d} />
        ))}
      </div>

    </div>
  )
}

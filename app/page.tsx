'use client'

import { useEffect, useState } from 'react'
import WeatherIcon from '@/components/WeatherIcon'

export default function Home() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch('/api/weather')
      .then((res) => res.json())
      .then(setData)
  }, [])

  if (!data) {
    return <div className="p-10 text-white">Loading...</div>
  }

  if (data.error) {
    return <div className="p-10 text-red-400">{data.error}</div>
  }

  const current = data.current
  const forecast = data.forecast || []

  return (
    <main className="p-6 max-w-md mx-auto text-white">

      {/* CURRENT */}
      <div className="bg-white/10 rounded-2xl p-6 mb-6 text-center">
        <h1 className="text-4xl font-light">
          {current?.temp ?? '--'}°
        </h1>

        <p className="text-white/70">
          {current?.narrative || '—'}
        </p>

        <div className="flex justify-center my-3">
          {/* ✅ FIXED HERE */}
          <WeatherIcon iconCode={current?.iconCode} size={72} />
        </div>

        <div className="grid grid-cols-3 text-sm mt-4">
          <div>
            <p className="text-white/50">Feels</p>
            <p>{current?.feelsLike ?? '--'}°</p>
          </div>

          <div>
            <p className="text-white/50">Humidity</p>
            <p>{current?.humidity ?? '--'}%</p>
          </div>

          <div>
            <p className="text-white/50">Wind</p>
            <p>{current?.wind ?? '--'} km/h</p>
          </div>
        </div>
      </div>

      {/* FORECAST */}
      <div className="bg-white/5 rounded-2xl p-4">
        {forecast.map((d: any, i: number) => (
          <div
            key={i}
            className="flex items-center justify-between py-3 border-b border-white/10"
          >
            <div className="w-12">{d.day}</div>

            {/* ✅ FIXED HERE */}
            <WeatherIcon iconCode={d.iconCode} size={36} />

            <div className="flex-1 px-4 text-sm text-white/70">
              {d.narrative}
            </div>

            <div className="text-right">
              <span className="mr-2 text-white/60">
                {d.min}°
              </span>
              <span>{d.max}°</span>
            </div>
          </div>
        ))}
      </div>

    </main>
  )
}

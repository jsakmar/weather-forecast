'use client'

import { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import HourlyScroll from '@/components/HourlyScroll'
import WeatherStats from '@/components/WeatherStats'
import WeatherIcon from '@/components/WeatherIcon'

type Day = {
  day: string
  narrative: string
  min: number
  max: number
  precip: number
  iconCode?: number
}

type Hour = {
  time: string
  temp: number
  precip: number
  iconCode?: number
  windDir?: number
}

export default function Page() {
  const [daily, setDaily] = useState<Day[]>([])
  const [hourly, setHourly] = useState<Hour[]>([])
  const [today, setToday] = useState<any>(null)

  // ✅ FETCH ALL DATA
  useEffect(() => {
    fetch('/api/weather/daily')
      .then(res => res.json())
      .then(data => setDaily(data || []))

    fetch('/api/weather/hourly')
      .then(res => res.json())
      .then(data => setHourly(data || []))

    fetch('/api/weather/today')
      .then(res => res.json())
      .then(setToday)
  }, [])

  // ✅ CHART DATA (temp + precip)
  const chartData = hourly.map(h => ({
    time: h.time,
    temp: h.temp,
    precip: h.precip,
  }))

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 text-white p-6">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <h1 className="text-4xl font-light text-center mb-2">Weather</h1>
        <p className="text-center text-white/60 mb-6">Weekly forecast</p>

        {/* TODAY STATS */}
        {today && (
          <WeatherStats
            feelsLike={today.feelsLike}
            humidity={today.humidity}
            wind={today.wind}
          />
        )}

        {/* HOURLY SCROLL */}
        {hourly.length > 0 && <HourlyScroll data={hourly} />}

        {/* 📈 TEMPERATURE + PRECIP CHART */}
        <div className="bg-white/10 rounded-2xl p-4 mt-6">
          <h2 className="text-sm text-white/70 mb-2">
            Temperature & Precipitation
          </h2>

          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData}>
              <XAxis dataKey="time" stroke="#ccc" />
              
              {/* LEFT: TEMP */}
              <YAxis yAxisId="left" stroke="#ccc" />

              {/* RIGHT: PRECIP */}
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#38bdf8"
              />

              <Tooltip />

              {/* TEMP LINE */}
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="temp"
                stroke="#ffffff"
                strokeWidth={3}
                dot={false}
              />

              {/* 🌧️ PRECIP LINE (THIS WAS MISSING) */}
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="precip"
                stroke="#38bdf8"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 📋 DAILY FORECAST */}
        <div className="bg-white/10 rounded-2xl mt-6 divide-y divide-white/10">
          {daily.map((d, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4"
            >
              {/* LEFT */}
              <div className="flex items-center gap-4 w-1/2">
                <span className="w-12">{d.day}</span>

                <WeatherIcon
                  condition={String(d.iconCode || d.narrative)}
                  size={36}
                />

                <span className="text-white/70 truncate">
                  {d.narrative}
                </span>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-4 w-1/2 justify-end">
                <span className="text-blue-300 text-sm">
                  {d.precip}%
                </span>

                <span className="text-white/60">{d.min}°</span>

                {/* RANGE BAR */}
                <div className="w-24 h-1 bg-white/20 rounded relative">
                  <div
                    className="absolute h-1 bg-white rounded"
                    style={{
                      left: '20%',
                      width: '50%',
                    }}
                  />
                </div>

                <span>{d.max}°</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}

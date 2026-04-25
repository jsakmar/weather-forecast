import ForecastRow from '@/components/ForecastRow'
import SunriseSunset from '@/components/SunriseSunset'
import Radar from '@/components/Radar'

export default async function Page() {
  const base =
    process.env.NODE_ENV === 'production'
      ? 'https://weather-forecast-hazel-three.vercel.app'
      : 'http://localhost:3000'

  let data: any = null

  try {
    const res = await fetch(`${base}/api/weather`, {
      cache: 'no-store',
    })

    if (!res.ok) throw new Error('API failed')

    data = await res.json()
  } catch (e) {
    console.error(e)
  }

  const current = data?.current ?? {
    temp: 0,
    feels: 0,
    humidity: 0,
    wind: 0,
  }

  const forecast = Array.isArray(data?.forecast)
    ? data.forecast
    : []

  const globalMin = Math.min(...forecast.map((d: any) => d.min ?? 0), 0)
  const globalMax = Math.max(...forecast.map((d: any) => d.max ?? 0), 1)

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e3a8a] text-white p-6 space-y-6">

      {/* 🔹 CURRENT (COMPACT) */}
      <div className="text-center">
        <div className="text-5xl font-light">{current.temp}°</div>
        <div className="text-xs opacity-60">
          Feels like {current.feels}°
        </div>
      </div>

      {/* 🔹 STATS */}
      <div className="flex justify-between bg-white/10 rounded-xl px-6 py-3 text-sm backdrop-blur">
        <div>Feels {current.feels}°</div>
        <div>{current.humidity}%</div>
        <div>{current.wind} km/h</div>
      </div>

      {/* 🔹 SUN */}
      <SunriseSunset />

      {/* 🔹 RADAR */}
      <Radar />

      {/* 🔹 FORECAST */}
      <div className="space-y-3">
        {forecast.map((d: any, i: number) => (
          <ForecastRow
            key={i}
            day={d}
            globalMin={globalMin}
            globalMax={globalMax}
          />
        ))}
      </div>

    </main>
  )
}

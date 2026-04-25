import ForecastRow from '@/components/ForecastRow'

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
    if (!res.ok) throw new Error()
    data = await res.json()
  } catch {}

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
    <main className="max-w-sm mx-auto mt-6 p-4 rounded-2xl bg-gradient-to-b from-[#0f172a] to-[#1e3a8a] text-white space-y-4 shadow-xl">

      {/* 🔹 CURRENT (tight) */}
      <div className="text-center">
        <div className="text-4xl font-light leading-none">
          {current.temp}°
        </div>

        <div className="text-xs opacity-60 mt-1">
          Feels {current.feels}° • {current.humidity}% • {current.wind} km/h
        </div>
      </div>

      {/* 🔹 SUN (informational only) */}
      <div className="flex justify-between text-xs opacity-60">
        <div>Sunrise 06:12</div>
        <div>Sunset 18:45</div>
      </div>

      {/* 🔹 FORECAST */}
      <div className="space-y-1">
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

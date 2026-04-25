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
    <main className="
  w-full
  min-h-screen
  flex
  items-start
  justify-center
  bg-gradient-to-b from-[#0f172a] to-[#1e3a8a]
  text-white
">

  <div className="
    w-full
    max-w-md
    p-4
    sm:p-6
    space-y-3
  ">

    {/* 🔹 CARD */}
    <div className="
      w-full
      rounded-2xl
      bg-white/5
      backdrop-blur
      p-4
      space-y-3
      shadow-xl
    ">

      {/* 🔹 TOP ROW */}
      <div className="flex items-center justify-between text-xs opacity-70">

        <div className="text-left">
          <div className="opacity-60">Sunrise</div>
          <div>06:12</div>
        </div>

        <div className="text-center">
          <div className="text-4xl sm:text-5xl font-light leading-none">
            {current.temp}°
          </div>
          <div className="text-[10px] sm:text-xs opacity-60 mt-1">
            Feels {current.feels}° • {current.humidity}% • {current.wind} km/h
          </div>
        </div>

        <div className="text-right">
          <div className="opacity-60">Sunset</div>
          <div>18:45</div>
        </div>

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

    </div>

  </div>
</main>

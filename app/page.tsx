import WeatherIcon from '@/components/WeatherIcon'

export default async function Page() {
  const base =
    process.env.NODE_ENV === 'production'
      ? 'https://weather-forecast-hazel-three.vercel.app'
      : 'http://localhost:3000'

  let data: any = null

  // 🔹 SAFE FETCH
  try {
    const res = await fetch(`${base}/api/weather`, {
      cache: 'no-store',
    })

    if (!res.ok) throw new Error('API failed')

    data = await res.json()
  } catch (err) {
    console.error('PAGE FETCH ERROR:', err)
  }

  // 🔹 HARD FALLBACKS (NO CRASH EVER)
  const current = data?.current ?? {
    temp: 0,
    feels: 0,
    humidity: 0,
    wind: 0,
  }

  const forecast = Array.isArray(data?.forecast)
    ? data.forecast
    : []

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e3a8a] text-white p-6">

      {/* =========================
          CURRENT WEATHER
      ========================= */}
      <div className="text-center mb-10">
        <div className="text-6xl font-light">
          {current.temp ?? '--'}°
        </div>

        <div className="text-sm opacity-70">
          Feels like {current.feels ?? '--'}°
        </div>
      </div>

      {/* =========================
          STATS
      ========================= */}
      <div className="flex justify-around mb-10 bg-white/10 rounded-xl p-4 backdrop-blur">
        <div className="text-center">
          <div className="text-xs opacity-60">Feels</div>
          <div>{current.feels ?? '--'}°</div>
        </div>

        <div className="text-center">
          <div className="text-xs opacity-60">Humidity</div>
          <div>{current.humidity ?? '--'}%</div>
        </div>

        <div className="text-center">
          <div className="text-xs opacity-60">Wind</div>
          <div>{current.wind ?? '--'} km/h</div>
        </div>
      </div>

      {/* =========================
          FORECAST
      ========================= */}
      <div className="space-y-3">

        {forecast.length > 0 ? (
          forecast.map((d: any, i: number) => {
            const narrative = d?.narrative ?? ''
            const iconCode = d?.iconCode

            return (
              <div
                key={i}
                className="flex items-center justify-between bg-white/5 p-4 rounded-xl"
              >
                {/* Day */}
                <div className="w-12 font-medium">
                  {d?.day ?? '--'}
                </div>

                {/* Icon */}
                <WeatherIcon
                  condition={narrative}
                  iconCode={iconCode}
                  size={36}
                />

                {/* Description */}
                <div className="flex-1 px-4 text-sm opacity-80">
                  {narrative || '—'}
                </div>

                {/* Temps */}
                <div className="text-right w-20">
                  <div className="font-medium">
                    {d?.max ?? '--'}°
                  </div>
                  <div className="opacity-50">
                    {d?.min ?? '--'}°
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="text-center opacity-50 py-10">
            No forecast data
          </div>
        )}

      </div>
    </main>
  )
}

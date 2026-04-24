import ForecastList from "../components/ForecastList"
import TempChart from "../components/TempChart"

export const dynamic = "force-dynamic"

async function getData() {
  try {
    const res = await fetch(
      "https://weather-forecast-hazel-three.vercel.app/api/weather",
      { cache: "no-store" }
    )
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}

export default async function Page() {
  const data = await getData()

  if (!data || data.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        No data
      </main>
    )
  }

  const today = data[0]

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 via-sky-800 to-blue-700 text-white">

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">

        {/* HERO */}
        <section className="text-center space-y-1">
          <h1 className="text-5xl font-semibold">{today.max}°</h1>
          <p className="text-white/80">{today.narrative}</p>
          <p className="text-sm text-white/60">
            H: {today.max}° L: {today.min}°
          </p>
        </section>

        {/* CHART */}
        <section className="bg-white/10 backdrop-blur-2xl rounded-3xl p-5 shadow-xl">
          <p className="text-sm text-white/70 mb-3">Temperature Trend</p>
          <div className="h-[250px]">
            <TempChart data={data} />
          </div>
        </section>

        {/* FORECAST */}
        <section className="bg-white/10 backdrop-blur-2xl rounded-3xl p-5 shadow-xl">
          <ForecastList data={data} />
        </section>

      </div>
    </main>
  )
}

import ForecastList from "../components/ForecastList"
import TempChart from "../components/TempChart"

export const dynamic = "force-dynamic"

async function getData() {
  try {
    const res = await fetch(
      "https://weather-forecast-hazel-three.vercel.app/api/weather",
      { cache: "no-store" }
    )

    if (!res.ok) {
      console.error("API ERROR:", res.status)
      return []
    }

    return await res.json()
  } catch (err) {
    console.error("FETCH ERROR:", err)
    return []
  }
}

export default async function Page() {
  const data = await getData()

  if (!data || data.length === 0) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        No weather data
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-6 space-y-6">

      {/* Chart */}
      <TempChart data={data} />

      {/* Forecast cards */}
      <ForecastList data={data} />

    </main>
  )
}

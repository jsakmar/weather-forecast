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
      <main className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <p>No weather data available</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">

        <h1 className="text-2xl font-bold tracking-wide">
          Weather Forecast
        </h1>

        <TempChart data={data} />

        <ForecastList data={data} />

      </div>
    </main>
  )
}import ForecastList from "../components/ForecastList"
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
<main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">

  <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">

    {/* Title */}
    <h1 className="text-2xl font-bold tracking-wide">
      Weather Forecast
    </h1>

    {/* Chart */}
    <TempChart data={data} />

    {/* Forecast */}
    <ForecastList data={data} />

  </div>

</main>
  )
}

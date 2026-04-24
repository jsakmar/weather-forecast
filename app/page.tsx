import ForecastList from "../components/ForecastList"
import TempChart from "../components/TempChart"
import { GET as getWeather } from "./api/weather/route"

export const dynamic = "force-dynamic"

// ✅ REQUIRED — this was missing
async function getData() {
  try {
    const res = await getWeather()
    const data = await res.json()

    if (!data || data.error) {
      console.error("API ERROR:", data)
      return []
    }

    return data
  } catch (err) {
    console.error("FETCH ERROR:", err)
    return []
  }
}

export default async function Page() {
  const data = await getData()

  // 🧪 debug fallback
  if (!data || data.length === 0) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>No weather data available</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-6 space-y-6">

      {/* Chart */}
      <TempChart data={data} />

      {/* Cards */}
      <ForecastList data={data} />

    </main>
  )
}

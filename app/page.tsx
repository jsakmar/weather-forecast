import ForecastList from "../components/ForecastList"
import TempChart from "../components/TempChart"
import { GET as getWeather } from "./api/weather/route"

// disable static build (required)
export const dynamic = "force-dynamic"

async function getData() {
  try {
    const res = await getWeather()   // ✅ direct call, no HTTP
    const data = await res.json()
    return data
  } catch (err) {
    console.error("FETCH ERROR:", err)
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
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-6 space-y-6">
      <TempChart data={data} />
      <ForecastList data={data} />
    </main>
  )
}

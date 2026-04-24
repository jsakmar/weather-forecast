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
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
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

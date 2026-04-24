import ForecastList from "../components/ForecastList"
import TempChart from "../components/TempChart"

// 🔥 disable static rendering (required for no-store)
export const dynamic = "force-dynamic"

async function getData() {
  try {
    // ✅ works both locally + on Vercel
    const base =
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000"

    const res = await fetch(`${base}/api/weather`, {
      cache: "no-store",
    })

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

  // 🛡️ prevent crashes
  if (!data || data.length === 0) {
    return (
      <main className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <p>No weather data available</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-6 space-y-6">

      {/* 📈 Temperature Chart */}
      <TempChart data={data} />

      {/* 📦 Forecast Cards */}
      <ForecastList data={data} />

    </main>
  )
}

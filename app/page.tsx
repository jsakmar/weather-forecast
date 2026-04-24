import ForecastList from "../components/ForecastList"
import TempChart from "../components/TempChart"

async function getData() {
  try {
    const res = await fetch(
      "https://weather-forecast-hazel-three.vercel.app/api/weather",
      { cache: "no-store" }
    )

    if (!res.ok) {
      throw new Error(`API failed: ${res.status}`)
    }

    return await res.json()

  } catch (e) {
    console.error("FETCH ERROR:", e)
    return [] // 👈 prevents crash
  }
}

export default async function Page() {
  const data = await getData()

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 p-6 space-y-6">
      <TempChart data={data} />
      <ForecastList data={data} />
    </main>
  )
}

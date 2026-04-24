import ForecastList from "../components/ForecastList"

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/weather`, {
    cache: "no-store",
  })
  return res.json()
}

export default async function Page() {
  const data = await getData()

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 p-6">
      <ForecastList data={data} />
    </main>
  )
}

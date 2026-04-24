import TempChart from "../components/TempChart"

export default async function Page() {
  const data = [
    { day: "Fri", max: 13, min: 4 },
    { day: "Sat", max: 17, min: 2 },
  ]

  return (
    <main>
      <TempChart data={data} />
    </main>
  )
}

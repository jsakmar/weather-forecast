'use client'

export default function WeatherStats({ current }: any) {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 text-white flex justify-around shadow-xl border border-white/10">

      <Stat label="Feels" value={`${current.feels}°`} />
      <Stat label="Humidity" value={`${current.humidity}%`} />
      <Stat label="Wind" value={`${current.wind} km/h`} />

    </div>
  )
}

function Stat({ label, value }: any) {
  return (
    <div className="text-center">
      <div className="text-xs opacity-60">{label}</div>
      <div className="text-2xl font-light">{value}</div>
    </div>
  )
}

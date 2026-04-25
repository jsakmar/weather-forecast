'use client'

export default function WeatherStats({ current }: any) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-white flex justify-around">

      <div>
        <div className="text-sm opacity-70">Feels</div>
        <div className="text-xl">{current.feels}°</div>
      </div>

      <div>
        <div className="text-sm opacity-70">Humidity</div>
        <div className="text-xl">{current.humidity}%</div>
      </div>

      <div>
        <div className="text-sm opacity-70">Wind</div>
        <div className="text-xl">{current.wind} km/h</div>
      </div>

    </div>
  )
}

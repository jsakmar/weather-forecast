export default function WeatherCard({ d }: any) {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-white shadow-lg hover:scale-[1.03] transition-all">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{d.day}</h3>
        <div className="text-3xl">
          {d.icon === 29 ? "☁️" : d.icon === 33 ? "🌤️" : "☀️"}
        </div>
      </div>

      {/* TEMP (PRIMARY FOCUS) */}
      <div className="mt-4">
        <div className="text-4xl font-bold">
          {d.max}°
          <span className="text-lg opacity-60 ml-2">
            {d.min}°
          </span>
        </div>
      </div>

      {/* CONDITION */}
      <p className="text-sm opacity-80 mt-2 line-clamp-2">
        {d.narrative}
      </p>

      {/* DIVIDER */}
      <div className="h-px bg-white/10 my-4" />

      {/* METRICS GRID */}
      <div className="grid grid-cols-2 gap-3 text-sm">

        <div className="flex justify-between">
          <span>🌧️ Rain</span>
          <span>{d.precipChance}%</span>
        </div>

        <div className="flex justify-between">
          <span>💨 Wind</span>
          <span>{d.windSpeed} km/h</span>
        </div>

        <div className="flex justify-between">
          <span>💧 Humidity</span>
          <span>{d.humidity}%</span>
        </div>

        <div className="flex justify-between">
          <span>☀️ UV</span>
          <span>{d.uvIndex}</span>
        </div>

      </div>

      {/* WIND DIR (small detail = premium feel) */}
      <div className="text-xs opacity-60 mt-3 text-right">
        Wind direction: {d.windDir}
      </div>

    </div>
  )
}

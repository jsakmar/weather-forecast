'use client'

const iconMap: Record<number, string> = {
  29: "🌤️",
  30: "🌤️",
  33: "🌙",
  34: "☀️",
  26: "☁️",
  12: "🌧️",
  13: "🌨️",
  4: "⛈️",
}

export default function ForecastList({ data }: any) {
  if (!data || !Array.isArray(data)) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">

      {data.map((d: any, i: number) => {
        if (!d) return null

        const icon = iconMap[d.icon] || "❓"

        return (
          <div
            key={i}
            className="
              bg-white/10 backdrop-blur-xl
              rounded-2xl p-5 text-white
              shadow-lg
              transition-all duration-300
              hover:scale-105 hover:bg-white/20
            "
          >
            {/* Day */}
            <h3 className="text-lg font-semibold">{d.day}</h3>

            {/* Icon */}
            <div className="text-4xl my-2">{icon}</div>

            {/* Temps */}
            <div className="text-sm">
              <span className="text-orange-400 font-bold">
                {d.max}°
              </span>{" "}
              /{" "}
              <span className="text-blue-300">
                {d.min}°
              </span>
            </div>

            {/* Description */}
            <p className="text-xs opacity-70 mt-2">
              {d.narrative}
            </p>

            {/* Extra data */}
            <div className="text-xs mt-3 opacity-80 space-y-1">
              <div>🌧 {d.precipChance ?? 0}%</div>
              <div>💨 {d.windSpeed ?? 0} km/h {d.windDir}</div>
              <div>💧 {d.humidity ?? 0}%</div>
            </div>

          </div>
        )
      })}

    </div>
  )
}

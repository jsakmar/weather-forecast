'use client'

function getIcon(code: number) {
  if ([32, 34].includes(code)) return "☀️"
  if ([30].includes(code)) return "🌤️"
  if ([26, 28].includes(code)) return "☁️"
  if ([12, 40].includes(code)) return "🌧️"
  if ([13, 16].includes(code)) return "❄️"
  return "🌡️"
}

export default function ForecastList({ data }: any) {
  if (!data || data.length === 0) return null

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.map((day: any, i: number) => (
        <div
          key={i}
          className="
            bg-white/10 backdrop-blur-xl
            rounded-2xl p-5
            shadow-lg border border-white/10
            transition-all duration-300
            hover:scale-[1.03] hover:bg-white/20
          "
        >
          {/* DAY */}
          <p className="text-sm text-slate-300">
            {day.day}
          </p>

          {/* ICON + TEMP */}
          <div className="flex items-center justify-between mt-2">
            <span className="text-4xl">
              {getIcon(day.icon)}
            </span>

            <div className="text-right">
              <p className="text-2xl font-semibold">
                {day.max}°
              </p>
              <p className="text-sm text-slate-400">
                {day.min}°
              </p>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="h-px bg-white/10 my-4" />

          {/* SMALL STATS */}
          <div className="flex justify-between text-xs text-slate-300">
            <span>🌧 {day.precipChance}%</span>
            <span>💨 {day.windSpeed}</span>
            <span>💧 {day.humidity}%</span>
          </div>
        </div>
      ))}
    </div>
  )
}

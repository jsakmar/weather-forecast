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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">

      {data.map((day: any, i: number) => (
        <div
          key={i}
          className="
            bg-white/10 backdrop-blur-xl
            rounded-2xl p-5 text-white
            shadow-xl border border-white/10
            transition-all duration-300
            hover:scale-105 hover:bg-white/20
          "
        >
          <h3 className="text-lg font-semibold tracking-wide">
            {day.day}
          </h3>

          <div className="text-3xl my-2">
            {getIcon(day.icon)}
          </div>

          <p className="text-xl font-bold">
            {day.max}° / {day.min}°
          </p>

          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            {day.narrative}
          </p>

          <div className="text-xs mt-3 text-slate-300 space-y-1">
            <div>🌧 {day.precipChance}%</div>
            <div>💨 {day.windSpeed} km/h {day.windDir}</div>
            <div>💧 {day.humidity}%</div>
          </div>
        </div>
      ))}

    </div>
  )
}

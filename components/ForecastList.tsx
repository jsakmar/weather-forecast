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
  if (!data) return null

  const maxTemp = Math.max(...data.map((d: any) => d.max))
  const minTemp = Math.min(...data.map((d: any) => d.min))

  return (
    <div className="divide-y divide-white/10">

      {data.map((day: any, i: number) => {
        const range = maxTemp - minTemp
        const width = ((day.max - day.min) / range) * 100

        return (
          <div
            key={i}
            className="flex items-center justify-between py-4"
          >
            <div className="flex items-center gap-3">
              <span className="w-16 text-sm text-white/70">
                {day.day}
              </span>
              <span className="text-xl">
                {getIcon(day.icon)}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-white/50">
                {day.min}°
              </span>

              <div className="w-24 h-1 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full"
                  style={{ width: `${width}%` }}
                />
              </div>

              <span className="text-white font-medium">
                {day.max}°
              </span>
            </div>
          </div>
        )
      })}

    </div>
  )
}

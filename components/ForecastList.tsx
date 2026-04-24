export default function ForecastList({ forecast }: any) {
  return (
    <div className="bg-slate-800 p-4 rounded-xl space-y-3">
      {forecast.dayOfWeek.map((day: string, i: number) => (
        <div key={i} className="flex justify-between border-b border-slate-700 pb-2">
          <span>{day}</span>
          <span>{forecast.calendarDayTemperatureMax[i]}° / {forecast.calendarDayTemperatureMin[i]}°</span>
        </div>
      ))}
    </div>
  )
}

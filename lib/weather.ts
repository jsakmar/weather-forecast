export function formatForecast(data: any) {
  return data.dayOfWeek.map((day: string, i: number) => ({
    day,
    max: data.calendarDayTemperatureMax[i],
    min: data.calendarDayTemperatureMin[i],
    narrative: data.narrative[i]
  }))
}

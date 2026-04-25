const BASE = 'https://cdn.jsdelivr.net/gh/basmilius/weather-icons@2.0.0/production/fill/all/'

// 🔹 TEXT → ICON (your original working mapping)
export function getWeatherIconFromCondition(condition: string) {
  const c = condition.toLowerCase()

  if (c.includes('clear') || c.includes('sun')) return 'clear-day.svg'
  if (c.includes('partly')) return 'partly-cloudy-day.svg'
  if (c.includes('cloud')) return 'cloudy.svg'
  if (c.includes('rain') || c.includes('drizzle')) return 'rain.svg'
  if (c.includes('storm') || c.includes('thunder')) return 'thunderstorms.svg'
  if (c.includes('snow')) return 'snow.svg'
  if (c.includes('wind')) return 'wind.svg'

  return 'cloudy.svg'
}

// 🔹 ICON CODE → fallback (WU)
export function getWeatherIconFromCode(iconCode?: number) {
  if (!iconCode) return `${BASE}cloudy.svg`

  // minimal mapping (keep simple)
  if ([32, 34].includes(iconCode)) return `${BASE}clear-day.svg`
  if ([30].includes(iconCode)) return `${BASE}partly-cloudy-day.svg`
  if ([26].includes(iconCode)) return `${BASE}cloudy.svg`
  if ([12, 11].includes(iconCode)) return `${BASE}rain.svg`
  if ([4].includes(iconCode)) return `${BASE}thunderstorms.svg`
  if ([16].includes(iconCode)) return `${BASE}snow.svg`

  return `${BASE}cloudy.svg`
}

// 🔥 MAIN (this is what everything uses)
export function getWeatherIcon({
  condition,
  iconCode,
}: {
  condition?: string
  iconCode?: number
}) {
  if (condition) {
    return BASE + getWeatherIconFromCondition(condition)
  }

  return getWeatherIconFromCode(iconCode)
}

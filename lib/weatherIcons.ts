// /lib/weatherIcons.ts

export function getWeatherIcon(
  condition: string,
  isNight?: boolean
) {
  const c = condition?.toLowerCase() || ""

  // 🌙 NIGHT variants
  if (isNight) {
    if (c.includes('partly')) return 'partly-cloudy-night.svg'
    if (c.includes('cloud')) return 'cloudy-night.svg'
    if (c.includes('rain') || c.includes('drizzle')) return 'rain-night.svg'
    if (c.includes('storm') || c.includes('thunder')) return 'thunderstorms-night.svg'
    if (c.includes('snow')) return 'snow-night.svg'
    if (c.includes('fog') || c.includes('mist')) return 'fog-night.svg'
    return 'clear-night.svg'
  }

  // ☀️ DAY variants
  if (c.includes('clear') || c.includes('sun')) return 'clear-day.svg'
  if (c.includes('partly')) return 'partly-cloudy-day.svg'
  if (c.includes('cloud')) return 'cloudy.svg'

  // 🌧 precipitation
  if (c.includes('drizzle')) return 'drizzle.svg'
  if (c.includes('rain')) return 'rain.svg'

  // ⛈ storms
  if (c.includes('storm') || c.includes('thunder')) return 'thunderstorms.svg'

  // ❄️ snow
  if (c.includes('snow')) return 'snow.svg'

  // 🌫 atmosphere
  if (c.includes('fog') || c.includes('mist')) return 'fog.svg'
  if (c.includes('haze')) return 'haze.svg'

  // 💨 wind
  if (c.includes('wind')) return 'wind.svg'

  // fallback
  return 'cloudy.svg'
}

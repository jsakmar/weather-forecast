'use client'

const BASE =
  'https://cdn.jsdelivr.net/gh/basmilius/weather-icons@2.0.0/production/fill/all/'

function mapIcon(condition: string) {
  const c = condition.toLowerCase()

  if (c.includes('clear') || c.includes('sun')) return 'clear-day.svg'
  if (c.includes('night')) return 'clear-night.svg'
  if (c.includes('partly')) return 'partly-cloudy-day.svg'
  if (c.includes('cloud')) return 'cloudy.svg'
  if (c.includes('rain') || c.includes('drizzle')) return 'rain.svg'
  if (c.includes('storm') || c.includes('thunder')) return 'thunderstorms.svg'
  if (c.includes('snow')) return 'snow.svg'
  if (c.includes('wind')) return 'wind.svg'

  return 'cloudy.svg'
}

export default function WeatherIcon({
  condition,
  size = 40,
}: {
  condition: string
  size?: number
}) {
  const icon = mapIcon(condition)

  return (
    <img
      src={`${BASE}${icon}`}
      width={size}
      height={size}
      alt="weather"
    />
  )
}

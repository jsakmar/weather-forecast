'use client'

import { getWeatherIcon } from '@/lib/weatherIcons'

const BASE =
  "https://cdn.jsdelivr.net/gh/basmilius/weather-icons@2.0.0/production/fill/all/"

export default function WeatherIcon({
  condition,
  isNight,
  size = 56,
}: {
  condition: string
  isNight?: boolean
  size?: number
}) {
  const icon = getWeatherIcon(condition, isNight)

  return (
    <img
      src={`${BASE}${icon}`}
      width={size}
      height={size}
      className="object-contain"
      alt={condition}
    />
  )
}

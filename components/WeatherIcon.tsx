'use client'

import { getWeatherIcon } from '@/lib/weatherIcons'

export default function WeatherIcon({
  condition,
  iconCode,
  size = 40,
}: {
  condition?: string
  iconCode?: number
  size?: number
}) {
  const src = getWeatherIcon({ condition, iconCode })

  return (
    <img
      src={src}
      width={size}
      height={size}
      alt="weather"
      className="drop-shadow-md"
    />
  )
}

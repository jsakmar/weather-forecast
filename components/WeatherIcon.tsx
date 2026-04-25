'use client'

import { getWeatherIcon } from '@/lib/weatherIcons'

export default function WeatherIcon({
  iconCode,
  size = 40,
}: {
  iconCode?: number
  size?: number
}) {
  return (
    <img
      src={getWeatherIcon(iconCode)}
      width={size}
      height={size}
      alt="weather"
      className="drop-shadow-md"
    />
  )
}

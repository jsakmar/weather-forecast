'use client'

const BASE = 'https://twcapi.co/TWCICON/'

export function getWeatherIcon(iconCode?: number) {
  if (!iconCode) return `${BASE}na.png`
  return `${BASE}${iconCode}.png`
}

function mapIcon(code?: number) {
  if (!code) return 'cloudy.svg'

  if ([32, 34, 36].includes(code)) return 'clear-day.svg'
  if ([31, 33].includes(code)) return 'clear-night.svg'
  if ([30, 44].includes(code)) return 'partly-cloudy-day.svg'
  if ([29].includes(code)) return 'partly-cloudy-night.svg'
  if ([26, 28].includes(code)) return 'cloudy.svg'
  if ([12, 40].includes(code)) return 'rain.svg'
  if ([3, 4, 37, 38].includes(code)) return 'thunderstorms.svg'
  if ([13, 14, 16].includes(code)) return 'snow.svg'
  if ([24].includes(code)) return 'wind.svg'

  return 'cloudy.svg'
}

export default function WeatherIcon({
  iconCode,
  size = 52,
}: {
  iconCode?: number
  size?: number
}) {
  const icon = mapIcon(iconCode)

  return (
    <img
      src={`${BASE}${icon}`}
      width={size}
      height={size}
      alt=""
      className="opacity-90"
    />
  )
}

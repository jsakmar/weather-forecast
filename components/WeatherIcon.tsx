'use client'

const ICON_BASE = 'https://twcapi.co/TWCICON/'

export default function WeatherIcon({
  iconCode,
  size = 48,
}: {
  iconCode?: number
  size?: number
}) {
  if (!iconCode) return null

  return (
    <img
      src={`${ICON_BASE}${iconCode}.png`}
      width={size}
      height={size}
      alt="weather"
    />
  )
}

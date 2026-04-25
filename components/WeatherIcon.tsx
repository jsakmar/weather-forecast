'use client'

const BASE = 'https://twcapi.co/TWCICON/'

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
      src={`${BASE}${iconCode}.png`}
      width={size}
      height={size}
      alt=""
      style={{ filter: 'brightness(0) invert(1)' }}
    />
  )
}

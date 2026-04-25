'use client'

import Lottie from 'lottie-react'
import { useEffect, useState } from 'react'
import { getLottieUrl } from '@/lib/weatherIcons'

export default function WeatherIcon({
  iconCode,
  size = 80,
}: {
  iconCode?: number
  size?: number
}) {
  const [anim, setAnim] = useState<any>(null)

  useEffect(() => {
    const url = getLottieUrl(iconCode)
    fetch(url)
      .then(r => r.json())
      .then(setAnim)
  }, [iconCode])

  if (!anim) return null

  return (
    <div style={{ width: size, height: size }}>
      <Lottie animationData={anim} loop autoplay />
    </div>
  )
}

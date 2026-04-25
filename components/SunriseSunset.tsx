'use client'

import { useMemo } from 'react'

function getProgress(sunrise: string, sunset: string) {
  const now = new Date()

  const [srH, srM] = sunrise.split(':').map(Number)
  const [ssH, ssM] = sunset.split(':').map(Number)

  const start = new Date()
  start.setHours(srH, srM, 0)

  const end = new Date()
  end.setHours(ssH, ssM, 0)

  const total = end.getTime() - start.getTime()
  const current = now.getTime() - start.getTime()

  return Math.min(Math.max(current / total, 0), 1)
}

export default function SunriseSunset({
  sunrise,
  sunset,
}: {
  sunrise: string
  sunset: string
}) {
  const progress = useMemo(
    () => getProgress(sunrise, sunset),
    [sunrise, sunset]
  )

  // arc math
  const radius = 50
  const angle = Math.PI * progress
  const x = 50 - radius * Math.cos(angle)
  const y = 50 - radius * Math.sin(angle)

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div className="relative w-40 h-20">
        <svg viewBox="0 0 100 50" className="w-full h-full">
          {/* arc */}
          <path
            d="M 0 50 A 50 50 0 0 1 100 50"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2"
          />

          {/* 🌞 animated sun */}
          <circle
            cx={x}
            cy={y}
            r="4"
            fill="#facc15"
          />
        </svg>

        {/* labels */}
        <div className="absolute bottom-0 left-0 text-[10px] text-white/50">
          {sunrise}
        </div>
        <div className="absolute bottom-0 right-0 text-[10px] text-white/50">
          {sunset}
        </div>
      </div>
    </div>
  )
}

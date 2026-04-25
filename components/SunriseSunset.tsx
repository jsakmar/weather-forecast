'use client'

export default function SunriseSunset({
  sunrise,
  sunset,
}: {
  sunrise: string
  sunset: string
}) {
  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div className="relative w-40 h-20">
        {/* arc */}
        <svg viewBox="0 0 100 50" className="w-full h-full">
          <path
            d="M 0 50 A 50 50 0 0 1 100 50"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2"
          />

          {/* sun (static center for now) */}
          <circle cx="50" cy="15" r="4" fill="#facc15" />
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

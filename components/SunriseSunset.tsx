'use client'

export default function SunriseSunset() {
  // 🔹 fallback static (WU free tier doesn't provide this cleanly)
  const sunrise = '06:12'
  const sunset = '18:45'

  return (
    <div className="bg-white/5 rounded-xl p-4 text-center">
      <div className="text-xs opacity-60 mb-2">Sunrise / Sunset</div>

      <div className="flex justify-between text-sm">
        <div>🌅 {sunrise}</div>
        <div>🌇 {sunset}</div>
      </div>

      {/* simple arc */}
      <div className="mt-3 h-10 relative">
        <div className="absolute w-full h-[1px] bg-white/20 top-1/2" />
        <div className="absolute left-1/2 top-0 -translate-x-1/2">
          ☀️
        </div>
      </div>
    </div>
  )
}

'use client'

export default function SunArc() {
  return (
    <div className="mt-6 flex flex-col items-center text-white">
      <div className="w-48 h-24 border-t border-yellow-400 rounded-t-full relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-yellow-300">
          ☀️
        </div>
      </div>
      <div className="flex justify-between w-48 text-xs opacity-70 mt-2">
        <span>06:12</span>
        <span>18:45</span>
      </div>
    </div>
  )
}

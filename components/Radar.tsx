'use client'

export default function Radar() {
  return (
    <div className="bg-white/5 rounded-xl overflow-hidden">
      <div className="text-xs opacity-60 p-3">Radar</div>

      <iframe
        src="https://embed.windy.com/embed2.html?lat=49.21&lon=19.56&zoom=7&level=surface&overlay=rain&menu=&message=&marker=&calendar=&pressure=&type=map&location=coordinates"
        className="w-full h-[250px]"
      />
    </div>
  )
}

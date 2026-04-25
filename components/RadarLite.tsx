'use client'

export default function RadarLite() {
  // RainViewer public radar tile (no API key)
  const TILE =
    'https://tilecache.rainviewer.com/v2/radar/latest/256/{z}/{x}/{y}/2/1_1.png'

  // Simple static embed (centered on your coords)
  const LAT = 49.219075
  const LON = 19.567464
  const ZOOM = 6

  const url = `https://www.rainviewer.com/map.html?loc=${LAT},${LON},${ZOOM}`

  return (
    <div className="h-[180px] rounded-xl overflow-hidden border border-white/10">
      <iframe
        src={url}
        className="w-full h-full border-0"
        loading="lazy"
      />
    </div>
  )
}

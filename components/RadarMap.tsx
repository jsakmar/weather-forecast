'use client'

import { useEffect, useRef, useState } from 'react'

export default function RadarMap() {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const [supported, setSupported] = useState(true)

  useEffect(() => {
    let mapboxgl: any

    async function init() {
      try {
        mapboxgl = (await import('mapbox-gl')).default

        // 🔥 check WebGL support BEFORE creating map
        if (!mapboxgl.supported()) {
          console.warn('WebGL not supported')
          setSupported(false)
          return
        }

        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX!

        const map = new mapboxgl.Map({
          container: mapRef.current!,
          style: 'mapbox://styles/mapbox/dark-v11',
          center: [19.567464, 49.219075],
          zoom: 7,
        })

        return () => map.remove()
      } catch (e) {
        console.error('Mapbox failed:', e)
        setSupported(false)
      }
    }

    init()
  }, [])

  // 🔥 fallback UI (prevents whole app crash)
  if (!supported) {
    return (
      <div className="h-[300px] rounded-2xl bg-white/5 flex items-center justify-center text-white/60">
        Radar unavailable (WebGL not supported)
      </div>
    )
  }

  return <div ref={mapRef} className="h-[300px] rounded-2xl overflow-hidden" />
}

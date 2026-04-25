'use client'

import mapboxgl from 'mapbox-gl'
import { useEffect, useRef } from 'react'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX!

export default function RadarMap() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const map = new mapboxgl.Map({
      container: ref.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [19.56, 49.21],
      zoom: 6,
    })

    return () => map.remove()
  }, [])

  return (
    <div
      ref={ref}
      className="h-64 mt-8 rounded-2xl overflow-hidden"
    />
  )
}

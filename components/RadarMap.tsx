'use client'

import mapboxgl from 'mapbox-gl'
import { useEffect, useRef } from 'react'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX!

export default function RadarMap() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: ref.current!,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [19.56, 49.21],
      zoom: 6,
    })

    return () => map.remove()
  }, [])

  return (
    <div className="h-64 mt-6 rounded-2xl overflow-hidden" ref={ref} />
  )
}

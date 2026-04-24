'use client'

import { useEffect, useState } from 'react'
import CurrentWeather from '@/components/CurrentWeather'
import ForecastList from '@/components/ForecastList'
import TempChart from '@/components/TempChart'

export default function Home() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch('/api/weather')
      .then(res => res.json())
      .then(setData)
  }, [])

  if (!data) return <div className="p-10">Loading...</div>

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <CurrentWeather obs={data.obs} />
        <TempChart forecast={data.forecast} />
      </div>

      <ForecastList forecast={data.forecast} />
    </div>
  )
}

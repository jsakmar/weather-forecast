'use client'

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement)

export default function TempChart({ forecast }: any) {
  const labels = forecast.dayOfWeek
  const max = forecast.calendarDayTemperatureMax
  const min = forecast.calendarDayTemperatureMin

  const data = {
    labels,
    datasets: [
      { label: 'Max Temp', data: max },
      { label: 'Min Temp', data: min }
    ]
  }

  return (
    <div className="bg-slate-800 p-4 rounded-xl">
      <Line data={data} />
    </div>
  )
}

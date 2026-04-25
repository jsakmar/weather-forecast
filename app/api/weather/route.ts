// /app/api/weather/route.ts

import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const API_KEY = process.env.WEATHER_API_KEY
    const LOCATION = 'London' // change or parametrize later

    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${LOCATION}&days=5`,
      { cache: 'no-store' }
    )

    if (!res.ok) {
      throw new Error('Weather API failed')
    }

    const data = await res.json()

    // 🔥 Normalize to YOUR UI format
    const forecast = data.forecast.forecastday.map((d: any) => ({
      day: new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' }),
      narrative: d.day.condition.text,
      min: Math.round(d.day.mintemp_c),
      max: Math.round(d.day.maxtemp_c),
      precip: Math.round(d.day.daily_chance_of_rain || 0),
    }))

    return NextResponse.json({ forecast })

  } catch (error) {
    console.error('Weather API error:', error)

    return NextResponse.json(
      { error: 'Failed to fetch weather' },
      { status: 500 }
    )
  }
}

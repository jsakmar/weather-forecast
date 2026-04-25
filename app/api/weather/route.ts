import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const API_KEY = process.env.WU_API_KEY
    const LAT = process.env.LAT
    const LON = process.env.LON

    // 🔹 WU 5-day forecast endpoint
    const res = await fetch(
      `https://api.weather.com/v3/wx/forecast/daily/5day?geocode=${LAT},${LON}&format=json&units=m&language=en-US&apiKey=${API_KEY}`,
      { cache: 'no-store' }
    )

    if (!res.ok) {
      throw new Error('WU API failed')
    }

    const data = await res.json()

    // 🔥 Normalize to your UI
    const forecast = data.dayOfWeek.map((day: string, i: number) => ({
      day: day.slice(0, 3),
      narrative: data.narrative[i],
      min: data.temperatureMin[i],
      max: data.temperatureMax[i],
      precip: data.daypart?.[0]?.precipChance?.[i] ?? 0,
      iconCode: data.daypart?.[0]?.iconCode?.[i],
    }))

    return NextResponse.json({ forecast })

  } catch (error) {
    console.error('WU API error:', error)

    return NextResponse.json(
      { error: 'Failed to fetch weather' },
      { status: 500 }
    )
  }
}

import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const API_KEY = process.env.WU_API_KEY
    const LAT = process.env.LAT
    const LON = process.env.LON

    // DAILY
    const dailyRes = await fetch(
      `https://api.weather.com/v3/wx/forecast/daily/5day?geocode=${LAT},${LON}&format=json&units=m&language=en-US&apiKey=${API_KEY}`,
      { cache: 'no-store' }
    )

    // HOURLY
    const hourlyRes = await fetch(
      `https://api.weather.com/v3/wx/forecast/hourly/24hour?geocode=${LAT},${LON}&format=json&units=m&language=en-US&apiKey=${API_KEY}`,
      { cache: 'no-store' }
    )

    // CURRENT
    const currentRes = await fetch(
      `https://api.weather.com/v3/wx/observations/current?geocode=${LAT},${LON}&format=json&units=m&language=en-US&apiKey=${API_KEY}`,
      { cache: 'no-store' }
    )
    console.log('DAILY:', dailyRes.status)
    console.log('HOURLY:', hourlyRes.status)
    console.log('CURRENT:', currentRes.status)
    
    if (!dailyRes.ok) throw new Error('Daily failed')
    if (!hourlyRes.ok) throw new Error('Hourly failed')
    if (!currentRes.ok) throw new Error('Current failed')

    const daily = await dailyRes.json()
    const hourly = await hourlyRes.json()
    const current = await currentRes.json()

    // ✅ SAFE forecast mapping
    const forecast = (daily.dayOfWeek || []).map((day: string, i: number) => ({
      day: day?.slice(0, 3),
      narrative: daily.narrative?.[i] ?? '',
      min: daily.temperatureMin?.[i] ?? 0,
      max: daily.temperatureMax?.[i] ?? 0,
      precip: daily.daypart?.[0]?.precipChance?.[i] ?? 0,
      iconCode: daily.daypart?.[0]?.iconCode?.[i] ?? null,
    }))

    // ✅ SIMPLE hourly mapping
    const hourlyData = (hourly.validTimeLocal || []).slice(0, 24).map((t: string, i: number) => ({
      time: t,
      temp: hourly.temperature?.[i],
      precip: hourly.precipChance?.[i],
      wind: hourly.windSpeed?.[i],
    }))

    return NextResponse.json({
      current,
      hourly: hourlyData,
      forecast,
    })

  } catch (error) {
    console.error('WU API error:', error)

    return NextResponse.json(
      { error: 'Failed to fetch weather' },
      { status: 500 }
    )
  }
}

import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const API_KEY = process.env.WU_API_KEY
    const LAT = process.env.LAT
    const LON = process.env.LON
    const STATION = process.env.STATION_ID

    // ✅ CURRENT (PWS works)
    const currentRes = await fetch(
      `https://api.weather.com/v2/pws/observations/current?stationId=${STATION}&format=json&units=m&apiKey=${API_KEY}`,
      { cache: 'no-store' }
    )

    // ✅ DAILY (works)
    const dailyRes = await fetch(
      `https://api.weather.com/v3/wx/forecast/daily/5day?geocode=${LAT},${LON}&format=json&units=m&language=en-US&apiKey=${API_KEY}`,
      { cache: 'no-store' }
    )

    if (!currentRes.ok) throw new Error('Current failed')
    if (!dailyRes.ok) throw new Error('Daily failed')

    const currentJson = await currentRes.json()
    const daily = await dailyRes.json()

    // 🔥 Normalize CURRENT
    const obs = currentJson.observations?.[0]

    const current = {
      temp: obs?.metric?.temp,
      feelsLike: obs?.metric?.heatIndex,
      humidity: obs?.humidity,
      wind: obs?.metric?.windSpeed,
      windDir: obs?.winddir,
      narrative: obs?.wx_phrase,
      iconCode: obs?.icon,
    }

    // 🔥 Normalize DAILY
    const forecast = (daily.dayOfWeek || []).map((day: string, i: number) => ({
      day: day?.slice(0, 3),
      narrative: daily.narrative?.[i],
      min: daily.temperatureMin?.[i],
      max: daily.temperatureMax?.[i],
      precip: daily.daypart?.[0]?.precipChance?.[i] ?? 0,
      iconCode: daily.daypart?.[0]?.iconCode?.[i],
    }))

    return NextResponse.json({
      current,
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

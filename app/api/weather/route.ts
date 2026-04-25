import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const API_KEY = process.env.WU_API_KEY!
    const LAT = process.env.LAT!
    const LON = process.env.LON!
    const STATION = process.env.STATION_ID!

    // 🔹 CURRENT CONDITIONS (PWS)
    const currentRes = await fetch(
      `https://api.weather.com/v2/pws/observations/current?stationId=${STATION}&format=json&units=m&apiKey=${API_KEY}`,
      { cache: 'no-store' }
    )

    if (!currentRes.ok) throw new Error('Current failed')

    const currentJson = await currentRes.json()
    const obs = currentJson.observations?.[0]

    const current = {
      temp: obs?.metric?.temp ?? 0,
      feels: obs?.metric?.heatIndex ?? obs?.metric?.windChill ?? 0,
      humidity: obs?.humidity ?? 0,
      wind: obs?.metric?.windSpeed ?? 0,
    }

    // 🔹 5-DAY FORECAST
    const forecastRes = await fetch(
      `https://api.weather.com/v3/wx/forecast/daily/5day?geocode=${LAT},${LON}&format=json&units=m&language=en-US&apiKey=${API_KEY}`,
      { cache: 'no-store' }
    )

    if (!forecastRes.ok) throw new Error('Forecast failed')

    const f = await forecastRes.json()

    const forecast = f.dayOfWeek.map((day: string, i: number) => ({
      day: day.slice(0, 3),
      narrative: f.narrative?.[i] ?? '',
      min: f.temperatureMin?.[i] ?? 0,
      max: f.temperatureMax?.[i] ?? 0,
      precip: f.daypart?.[0]?.precipChance?.[i] ?? 0,
      iconCode: f.daypart?.[0]?.iconCode?.[i] ?? 0,
    }))

    return NextResponse.json({
      current,
      forecast,
    })
  } catch (err) {
    console.error('API ERROR:', err)

    // 🔥 NEVER BREAK UI
    return NextResponse.json({
      current: {
        temp: 0,
        feels: 0,
        humidity: 0,
        wind: 0,
      },
      forecast: [],
    })
  }
}

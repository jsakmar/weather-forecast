import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const API_KEY = process.env.WU_API_KEY
    const LAT = process.env.LAT
    const LON = process.env.LON
    const STATION_ID = process.env.STATION_ID

    // CURRENT
    const currentRes = await fetch(
      `https://api.weather.com/v2/pws/observations/current?stationId=${STATION_ID}&format=json&units=m&apiKey=${API_KEY}`,
      { cache: 'no-store' }
    )

    // FORECAST
    const forecastRes = await fetch(
      `https://api.weather.com/v3/wx/forecast/daily/5day?geocode=${LAT},${LON}&format=json&units=m&language=en-US&apiKey=${API_KEY}`,
      { cache: 'no-store' }
    )

    if (!currentRes.ok || !forecastRes.ok) {
      throw new Error('API failed')
    }

    const currentData = await currentRes.json()
    const forecastData = await forecastRes.json()

    const obs = currentData.observations?.[0]

    const daypart = forecastData.daypart?.[0]

    const forecast = forecastData.dayOfWeek.map((d: string, i: number) => ({
      day: d.slice(0, 3),
      narrative: forecastData.narrative[i],
      min: forecastData.temperatureMin[i],
      max: forecastData.temperatureMax[i],
      iconCode: daypart?.iconCode?.[i] ?? 44,
      precip: daypart?.precipChance?.[i] ?? 0,
      windDir: daypart?.windDirectionCardinal?.[i] ?? 'N',
    }))

    return NextResponse.json({
      current: {
        temp: obs.metric.temp,
        feels: obs.metric.heatIndex ?? obs.metric.windChill,
        humidity: obs.humidity,
        wind: obs.metric.windSpeed,
      },
      forecast,
    })
  } catch (e) {
    return NextResponse.json({ error: 'failed' }, { status: 500 })
  }
}

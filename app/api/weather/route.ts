import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const lat = 49.219075
    const lon = 19.567464
    const key = process.env.WU_KEY!

    const url = `https://api.weather.com/v3/wx/forecast/daily/5day?geocode=${lat},${lon}&format=json&units=m&language=en-US&apiKey=${key}`

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://www.wunderground.com/',
      },
      cache: 'no-store',
    })

    const raw = await res.json()

    // 🔥 CLEAN FORMAT
const days = raw.dayOfWeek.map((day: string, i: number) => ({
  day,
  max: raw.calendarDayTemperatureMax[i],
  min: raw.calendarDayTemperatureMin[i],
  narrative: raw.narrative[i],

  // 🌧️ precipitation
  precipChance: raw.daypart?.[0]?.precipChance?.[i * 2 + 1] ?? null,
  rain: raw.qpfRain?.[i] ?? 0,

  // 💨 wind
  windSpeed: raw.daypart?.[0]?.windSpeed?.[i * 2 + 1] ?? null,
  windDir: raw.daypart?.[0]?.windDirectionCardinal?.[i * 2 + 1] ?? null,

  // ☀️ extras
  humidity: raw.daypart?.[0]?.relativeHumidity?.[i * 2 + 1] ?? null,
  uvIndex: raw.daypart?.[0]?.uvIndex?.[i * 2 + 1] ?? null,

  icon: raw.daypart?.[0]?.iconCode?.[i * 2 + 1] || null,
}))

    return NextResponse.json(days)

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )
  }
}

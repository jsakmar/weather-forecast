import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const lat = 49.219075
    const lon = 19.567464
    const key = process.env.WU_KEY

    if (!key) {
      return NextResponse.json(
        { error: 'Missing WU_KEY env variable' },
        { status: 500 }
      )
    }

    const url = `https://api.weather.com/v3/wx/forecast/daily/5day?geocode=${lat},${lon}&format=json&units=m&language=en-US&apiKey=${key}`

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
        'Referer': 'https://www.wunderground.com/',
      },
      cache: 'no-store',
    })

    // handle blocked / bad response
    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json(
        { error: 'WU request failed', details: text },
        { status: res.status }
      )
    }

    const data = await res.json()

    return NextResponse.json(data)

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Unknown error' },
      { status: 500 }
    )
  }
}

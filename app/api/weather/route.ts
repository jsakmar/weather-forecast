import { NextResponse } from 'next/server'
import axios from 'axios'

const API_KEY = process.env.WU_API_KEY
const LAT = process.env.LAT
const LON = process.env.LON
const STATION = process.env.STATION_ID

export async function GET() {
  try {
    const [obs, forecast] = await Promise.all([
      axios.get('https://api.weather.com/v2/pws/observations/current', {
        params: {
          stationId: STATION,
          format: 'json',
          units: 'm',
          apiKey: API_KEY
        }
      }),
      axios.get('https://api.weather.com/v3/wx/forecast/daily/7day', {
        params: {
          geocode: `${LAT},${LON}`,
          format: 'json',
          units: 'm',
          language: 'en-US',
          apiKey: API_KEY
        }
      })
    ])

    return NextResponse.json({
      obs: obs.data,
      forecast: forecast.data
    })

  } catch (e: any) {
    console.error('API ERROR:', e?.response?.data || e.message)

    return NextResponse.json(
      {
        error: true,
        message: e?.response?.data || e.message
      },
      { status: 500 }
    )
  }
}

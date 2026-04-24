import { NextResponse } from 'next/server'
import axios from 'axios'

const API_KEY = process.env.WU_API_KEY
const LAT = process.env.LAT
const LON = process.env.LON
const STATION = process.env.STATION_ID

// Browser-like headers (important for WU / Akamai)
const headers = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36',
  'Accept': 'application/json, text/plain, */*',
  'Accept-Language': 'en-US,en;q=0.9',
  'Connection': 'keep-alive'
}

export async function GET() {
  // Debug logs (check in Vercel logs if needed)
  console.log('ENV:', {
    API_KEY: !!API_KEY,
    LAT,
    LON,
    STATION
  })

  let obsData: any = null
  let forecastData: any = null

  // 🌡️ Current observations (PWS)
  try {
    const obs = await axios.get(
      'https://api.weather.com/v2/pws/observations/current',
      {
        params: {
          stationId: STATION,
          format: 'json',
          units: 'm',
          apiKey: API_KEY
        },
        headers,
        timeout: 5000
      }
    )

    obsData = obs.data
  } catch (e: any) {
    console.error('OBS ERROR:', e?.response?.data || e.message)
  }

  // 📅 Forecast (7-day)
  try {
    const forecast = await axios.get(
      'https://api.weather.com/v3/wx/forecast/daily/7day',
      {
        params: {
          geocode: `${LAT}%2C${LON}`, // encoded comma
          format: 'json',
          units: 'm',
          language: 'en-US',
          apiKey: API_KEY
        },
        headers,
        timeout: 5000
      }
    )

    forecastData = forecast.data
  } catch (e: any) {
    console.error('FORECAST ERROR:', e?.response?.data || e.message)
  }

  // Return whatever worked (no crash)
  return NextResponse.json({
    obs: obsData,
    forecast: forecastData,
    debug: {
      obs_ok: !!obsData,
      forecast_ok: !!forecastData
    }
  })
}

// /lib/weatherAnimations.ts

import sun from '@/public/lotties/sun.json'
import cloud from '@/public/lotties/cloudy.json'
import rain from '@/public/lotties/rain.json'
import storm from '@/public/lotties/storm.json'
import snow from '@/public/lotties/snow.json'
import wind from '@/public/lotties/wind.json'
import partly from '@/public/lotties/partly.json'

export function getWeatherAnimation(condition: string) {
  const c = condition.toLowerCase()

  if (c.includes('sun') || c.includes('clear')) return sun
  if (c.includes('partly')) return partly
  if (c.includes('cloud')) return cloud
  if (c.includes('rain') || c.includes('drizzle')) return rain
  if (c.includes('storm') || c.includes('thunder')) return storm
  if (c.includes('snow')) return snow
  if (c.includes('wind')) return wind

  return cloud
}

import RadarLite from '@/components/RadarLite'
import SunriseSunset from '@/components/SunriseSunset'

export default async function Page() {
  const data = await fetch(process.env.NEXT_PUBLIC_URL + '/api/weather', {
    cache: 'no-store',
  }).then((r) => r.json())

  const current = data.current
  const forecast = data.forecast

  return (
    <main className="p-4 max-w-3xl mx-auto space-y-4">

      {/* 🔥 COMPACT HERO */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 space-y-4 border border-white/10">

        {/* temp */}
        <div className="text-center">
          <div className="text-5xl font-light">{current.temp}°</div>
          <div className="text-xs text-white/60">
            Feels like {current.feels}°
          </div>
        </div>

        {/* stats row */}
        <div className="grid grid-cols-3 text-center text-sm">
          <div>
            <div className="text-white/50 text-xs">Feels</div>
            <div>{current.feels}°</div>
          </div>
          <div>
            <div className="text-white/50 text-xs">Humidity</div>
            <div>{current.humidity}%</div>
          </div>
          <div>
            <div className="text-white/50 text-xs">Wind</div>
            <div>{current.wind} km/h</div>
          </div>
        </div>

        {/* 📊 temp curve (keep yours, just shrink spacing) */}
        <div className="h-[60px] opacity-80">
          {/* your existing SVG curve stays */}
        </div>

        {/* 🌧️ radar */}
        <RadarLite />

        {/* 🌅 sun arc */}
        <SunriseSunset sunrise="06:12" sunset="18:45" />

      </div>

      {/* ✅ KEEP YOUR FORECAST BELOW UNCHANGED */}
      {forecast.map((d: any) => (
        <div key={d.day}>{/* your existing row */}</div>
      ))}
    </main>
  )
}

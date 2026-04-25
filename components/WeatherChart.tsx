'use client'

type Point = {
  temp: number
  precip: number // %
  label?: string
}

export default function WeatherChart({ data }: { data: Point[] }) {
  const width = 600
  const height = 120
  const padding = 20

  const temps = data.map((d) => d.temp)
  const minTemp = Math.min(...temps)
  const maxTemp = Math.max(...temps)

  // scale helpers
  const x = (i: number) =>
    padding + (i / (data.length - 1)) * (width - padding * 2)

  const yTemp = (t: number) =>
    height -
    padding -
    ((t - minTemp) / (maxTemp - minTemp || 1)) *
      (height - padding * 2)

  const yPrecip = (p: number) =>
    height - padding - (p / 100) * (height - padding * 2)

  // build paths
  const tempPath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${yTemp(d.temp)}`)
    .join(' ')

  const precipPath =
    data
      .map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${yPrecip(d.precip)}`)
      .join(' ') +
    ` L ${x(data.length - 1)} ${height - padding} L ${x(0)} ${
      height - padding
    } Z`

  return (
    <div className="w-full overflow-hidden">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-[120px]"
      >
        {/* 🌧️ precipitation area */}
        <path
          d={precipPath}
          fill="url(#rain)"
          opacity="0.35"
        />

        {/* 🌡️ temp line */}
        <path
          d={tempPath}
          fill="none"
          stroke="url(#temp)"
          strokeWidth="2.5"
        />

        {/* 🔵 temp dots */}
        {data.map((d, i) => (
          <circle
            key={i}
            cx={x(i)}
            cy={yTemp(d.temp)}
            r="2.5"
            fill="white"
          />
        ))}

        {/* gradients */}
        <defs>
          <linearGradient id="temp" x1="0" x2="1">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>

          <linearGradient id="rain" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>

      {/* labels */}
      <div className="flex justify-between text-xs text-white/50 px-1 mt-1">
        {data.map((d, i) => (
          <span key={i}>{d.label}</span>
        ))}
      </div>
    </div>
  )
}

type Props = {
  feelsLike: number
  humidity: number
  wind: number
}

export default function WeatherStats({ feelsLike, humidity, wind }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4 text-center mt-4">
      <div>
        <p className="text-white/60 text-xs">Feels like</p>
        <p className="text-lg">{feelsLike}°</p>
      </div>

      <div>
        <p className="text-white/60 text-xs">Humidity</p>
        <p className="text-lg">{humidity}%</p>
      </div>

      <div>
        <p className="text-white/60 text-xs">Wind</p>
        <p className="text-lg">{wind} km/h</p>
      </div>
    </div>
  )
}

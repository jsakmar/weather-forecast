export default function CurrentWeather({ obs }: any) {
  const o = obs.observations[0]

  return (
    <div className="bg-gradient-to-r from-blue-700 to-indigo-900 p-6 rounded-2xl shadow-xl">
      <h2 className="text-xl mb-2">Current Weather</h2>
      <div className="text-5xl font-bold">{o.metric.temp}°C</div>
      <div className="mt-2">Humidity: {o.humidity}%</div>
      <div>Wind: {o.metric.windSpeed} km/h</div>
    </div>
  )
}

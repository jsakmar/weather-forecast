import ForecastRow from './ForecastRow'

export default function ForecastList({ data }: any) {
  return (
    <div className="
      bg-white/10 backdrop-blur-xl
      rounded-2xl p-4
      shadow-xl border border-white/10
    ">
      {data.map((day: any, i: number) => (
        <ForecastRow key={i} day={day} />
      ))}
    </div>
  )
}

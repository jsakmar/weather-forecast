export default function WindArrow({ deg }: { deg: number }) {
  return (
    <div
      style={{
        transform: `rotate(${deg}deg)`,
      }}
      className="text-white/70"
    >
      ↑
    </div>
  )
}

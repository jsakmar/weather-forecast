import './globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-white">{children}</body>
    </html>
  )
}

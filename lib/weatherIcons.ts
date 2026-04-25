export function getLottieUrl(iconCode?: number): string {
  if (!iconCode) return fallback

  // ☀️ Clear / Sunny
  if ([32, 34, 36].includes(iconCode)) return sun

  // 🌤 Partly cloudy
  if ([30, 44].includes(iconCode)) return partly

  // ☁️ Cloudy / Overcast
  if ([26, 28].includes(iconCode)) return cloud

  // 🌧 Rain / Drizzle
  if ([9, 10, 11, 12, 40].includes(iconCode)) return rain

  // ⛈ Thunderstorm
  if ([3, 4, 37, 38, 39].includes(iconCode)) return storm

  // ❄️ Snow / Ice
  if ([5, 6, 7, 13, 14, 15, 16, 41, 42, 43].includes(iconCode))
    return snow

  // 🌬 Wind / Breezy
  if ([24].includes(iconCode)) return wind

  return fallback
}

/* =========================
   🎬 LOTTIE CDN ANIMATIONS
   ========================= */

// ☀️ Sun
const sun =
  'https://assets10.lottiefiles.com/packages/lf20_jmBauI.json'

// 🌤 Partly cloudy
const partly =
  'https://assets2.lottiefiles.com/packages/lf20_HflU56.json'

// ☁️ Cloud
const cloud =
  'https://assets9.lottiefiles.com/packages/lf20_XkF78Y.json'

// 🌧 Rain
const rain =
  'https://assets2.lottiefiles.com/packages/lf20_t24tpvcu.json'

// ⛈ Storm
const storm =
  'https://assets2.lottiefiles.com/packages/lf20_qp1q7mct.json'

// ❄️ Snow
const snow =
  'https://assets2.lottiefiles.com/packages/lf20_Stt1Rz.json'

// 🌬 Wind
const wind =
  'https://assets2.lottiefiles.com/packages/lf20_9cyyl8i7.json'

// fallback (safe default)
const fallback = cloud

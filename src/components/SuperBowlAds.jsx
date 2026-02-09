import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const ADS = [
  { brand: 'Budweiser', title: 'The Clydesdales Return', url: 'https://www.youtube.com/results?search_query=budweiser+super+bowl+2026+ad', emoji: '🍺' },
  { brand: 'Doritos', title: 'Crash the Super Bowl', url: 'https://www.youtube.com/results?search_query=doritos+super+bowl+2026+ad', emoji: '🔥' },
  { brand: 'Apple', title: 'Super Bowl LX Spot', url: 'https://www.youtube.com/results?search_query=apple+super+bowl+2026+ad', emoji: '🍎' },
  { brand: 'Nike', title: 'So Win', url: 'https://www.youtube.com/results?search_query=nike+super+bowl+2026+ad', emoji: '✔️' },
  { brand: 'Coca-Cola', title: 'Open Happiness', url: 'https://www.youtube.com/results?search_query=coca+cola+super+bowl+2026+ad', emoji: '🥤' },
  { brand: 'Google', title: 'AI Super Bowl Ad', url: 'https://www.youtube.com/results?search_query=google+super+bowl+2026+ad', emoji: '🔍' },
  { brand: 'Hyundai', title: 'Big Game Ad', url: 'https://www.youtube.com/results?search_query=hyundai+super+bowl+2026+ad', emoji: '🚗' },
  { brand: 'T-Mobile', title: 'Super Bowl Spot', url: 'https://www.youtube.com/results?search_query=tmobile+super+bowl+2026+ad', emoji: '📱' },
]

export default function SuperBowlAds() {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const next = useCallback(() => setIdx(i => (i + 1) % ADS.length), [])
  useEffect(() => { if (paused) return; const t = setInterval(next, 4000); return () => clearInterval(t) }, [next, paused])
  const ad = ADS[idx]

  return (
    <div className="glass-panel rounded-xl overflow-hidden" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400">🎬 Super Bowl Ads</h3>
        <div className="flex gap-1">{ADS.map((_, i) => <button key={i} onClick={() => setIdx(i)} className={`w-1.5 h-1.5 rounded-full transition-all ${i === idx ? 'bg-gold-accent w-4' : 'bg-gray-600'}`} />)}</div>
      </div>
      <AnimatePresence mode="wait">
        <motion.a key={ad.brand} href={ad.url} target="_blank" rel="noopener noreferrer"
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}
          className="flex items-center gap-4 p-4 group cursor-pointer">
          <div className="shrink-0 w-12 h-12 rounded-xl bg-dashboard-surface border border-white/10 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">{ad.emoji}</div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white group-hover:text-gold-accent transition-colors">{ad.brand}</p>
            <p className="text-xs text-gray-400">{ad.title}</p>
          </div>
          <span className="text-xs text-gold-accent opacity-0 group-hover:opacity-100 transition-opacity shrink-0">Watch ▶</span>
        </motion.a>
      </AnimatePresence>
    </div>
  )
}

import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const TEAM_COLOR = { SEA: 'text-seahawks-green', NE: 'text-patriots-red' }

export default function GameLeaders({ leaders = [] }) {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const next = useCallback(() => { if (leaders.length > 0) setIdx(i => (i + 1) % leaders.length) }, [leaders.length])
  useEffect(() => { if (paused || leaders.length <= 1) return; const t = setInterval(next, 4000); return () => clearInterval(t) }, [next, paused, leaders.length])

  if (!leaders.length) return <div className="glass-panel rounded-xl p-4 text-center text-gray-500 text-sm">Game leaders available at kickoff</div>
  const l = leaders[idx % leaders.length]

  return (
    <div className="glass-panel rounded-xl overflow-hidden" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400">Game Leaders</h3>
        <div className="flex gap-1">{leaders.map((_, i) => <button key={i} onClick={() => setIdx(i)} className={`w-1.5 h-1.5 rounded-full transition-all ${i === idx % leaders.length ? 'bg-gold-accent w-4' : 'bg-gray-600'}`} />)}</div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={l.name + l.category} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }} className="flex items-center gap-3 px-4 pb-4 pt-2">
          <div className="shrink-0 w-12 h-12 rounded-full overflow-hidden bg-dashboard-surface border border-white/10">
            {l.headshot ? <img src={l.headshot} alt={l.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-xl">⭐</div>}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs text-gray-400 uppercase tracking-wider">{l.category.replace(/([A-Z])/g, ' $1').trim()}</div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white truncate">{l.name}</span>
              <span className={`text-[10px] font-bold ${TEAM_COLOR[l.team] || 'text-white'}`}>{l.team}</span>
            </div>
            <div className="text-sm text-gold-accent font-mono">{l.value}</div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

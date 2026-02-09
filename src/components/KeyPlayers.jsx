import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const STYLES = { SEA: { border: 'border-seahawks-green/50', glow: 'shadow-[0_0_20px_rgba(105,190,40,0.25)]', badge: 'bg-seahawks-green/20 text-seahawks-green' }, NE: { border: 'border-patriots-red/50', glow: 'shadow-[0_0_20px_rgba(198,12,48,0.25)]', badge: 'bg-patriots-red/20 text-patriots-red' } }

function statLine(p) {
  const s = p.stats || {}
  if (p.position === 'QB') return `${s.completionsAttempts || '0/0'} · ${s.yards || 0} YDS · ${s.touchdowns || 0} TD · ${s.interceptions || 0} INT`
  if (p.position === 'WR') return `${s.receptions || 0} REC · ${s.yards || 0} YDS · ${s.touchdowns || 0} TD`
  if (p.position === 'RB') return `${s.carries || 0} CAR · ${s.yards || 0} YDS · ${s.touchdowns || 0} TD`
  return ''
}

export default function KeyPlayers({ playerStats, scores }) {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)

  const players = []
  if (playerStats) for (const pos of ['qb', 'wr', 'rb']) for (const side of ['home', 'away']) { const p = playerStats[pos]?.[side]; if (p && p.name !== 'N/A') players.push(p) }
  const list = players.length > 0 ? players : (scores ? [scores.home, scores.away].filter(s => s.name !== 'Home' && s.name !== 'Away').map(s => ({ name: s.name, team: s.abbreviation, headshot: s.logo, position: '', stats: {}, isFallback: true })) : [])

  const next = useCallback(() => { if (list.length > 0) setIdx(i => (i + 1) % list.length) }, [list.length])
  useEffect(() => { if (paused || list.length <= 1) return; const t = setInterval(next, 5000); return () => clearInterval(t) }, [next, paused, list.length])

  if (list.length === 0) return <div className="glass-panel rounded-xl p-4 text-center text-gray-500 text-sm">Player data available once the game begins</div>
  const p = list[idx % list.length], st = STYLES[p.team] || STYLES.NE

  return (
    <div className="glass-panel rounded-xl overflow-hidden" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400">{players.length > 0 ? 'Key Players' : 'Matchup'}</h3>
        <div className="flex gap-1">{list.map((_, i) => <button key={i} onClick={() => setIdx(i)} className={`w-1.5 h-1.5 rounded-full transition-all ${i === idx % list.length ? 'bg-gold-accent w-4' : 'bg-gray-600'}`} />)}</div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={p.name + p.team} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }} className="flex items-center gap-4 p-4">
          <div className={`relative shrink-0 w-16 h-16 rounded-full border-2 ${st.border} ${st.glow} overflow-hidden bg-dashboard-surface`}>
            {p.headshot ? <img src={p.headshot} alt={p.name} className="w-full h-full object-cover" onError={e => { e.target.style.display = 'none' }} /> : <div className="w-full h-full flex items-center justify-center text-2xl text-gray-500">🏈</div>}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-semibold text-white truncate">{p.name}</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${st.badge}`}>{p.team}</span>
            </div>
            <div className="text-xs text-gray-400 mb-1">{p.position}</div>
            <div className="text-sm text-gray-200 font-mono">{p.isFallback ? 'Stats available at kickoff' : statLine(p)}</div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

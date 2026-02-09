import { useRef, useEffect } from 'react'

function ordinal(n) { return n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th' }

function highlight(text) {
  if (!text) return text
  const kw = /\b(TOUCHDOWN|GOOD|INTERCEPTED|FUMBLE|SACKED|INCOMPLETE|NO GOOD|SAFETY|PENALTY)\b/gi
  const parts = text.split(kw)
  if (parts.length === 1) return text
  return parts.map((p, i) => kw.test(p) ? (kw.lastIndex = 0, <span key={i} className="font-bold text-gold-accent">{p}</span>) : p)
}

export default function PlayByPlay({ plays }) {
  const endRef = useRef(null)
  const recent = plays.slice(-15)
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [recent.length])

  return (
    <div className="card-glass rounded-xl p-4 max-h-[500px] overflow-y-auto">
      <h2 className="text-lg font-bold mb-3">Play-by-Play</h2>
      {recent.length === 0 && <p className="text-gray-400 text-sm">No plays yet.</p>}
      <div className="flex flex-col gap-2">
        <div ref={endRef} />
        {[...recent].reverse().map((p, i) => (
          <div key={p.id} className={`rounded-lg p-3 text-sm ${p.isScoring ? 'bg-gold-accent/20 border border-gold-accent' : 'bg-slate-700/50'}`}
            style={{ animation: `playSlideIn 0.4s ease-out ${i * 30}ms both` }}>
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Q{p.quarter} · {p.clock}</span>
              <span>{p.down > 0 && `${p.down}${ordinal(p.down)} & ${p.distance}`}{p.yardLine > 0 && ` at ${p.yardLine} yd line`}</span>
            </div>
            <p>{highlight(p.description)}</p>
          </div>
        ))}
      </div>
      <style>{`@keyframes playSlideIn { from { opacity:0; transform:translateX(-12px); } to { opacity:1; transform:translateX(0); } }`}</style>
    </div>
  )
}

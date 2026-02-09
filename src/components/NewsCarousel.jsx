import { useState, useCallback, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { fetchNews } from '../api'

export default function NewsCarousel() {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const { data: articles = [] } = useQuery({ queryKey: ['superbowl-news'], queryFn: fetchNews, staleTime: 300000, refetchInterval: 300000, retry: 1 })

  const next = useCallback(() => { if (articles.length > 0) setIdx(i => (i + 1) % articles.length) }, [articles.length])
  useEffect(() => { if (paused || articles.length <= 1) return; const t = setInterval(next, 8000); return () => clearInterval(t) }, [next, paused, articles.length])

  if (!articles.length) return <div className="glass-panel rounded-xl p-4 text-center text-gray-500 text-sm">Loading Super Bowl news...</div>
  const a = articles[idx % articles.length]

  return (
    <div className="glass-panel rounded-xl overflow-hidden" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400">Super Bowl News</h3>
        <div className="flex gap-1">{articles.map((_, i) => <button key={i} onClick={() => setIdx(i)} className={`w-1.5 h-1.5 rounded-full transition-all ${i === idx % articles.length ? 'bg-gold-accent w-4' : 'bg-gray-600'}`} />)}</div>
      </div>
      <AnimatePresence mode="wait">
        <motion.a key={a.headline} href={a.link} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }} className="flex gap-4 p-4 group cursor-pointer">
          {a.image && <div className="shrink-0 w-20 h-14 rounded-lg overflow-hidden bg-dashboard-surface"><img src={a.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" onError={e => { e.target.parentElement.style.display = 'none' }} /></div>}
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white leading-snug line-clamp-2 group-hover:text-gold-accent transition-colors">{a.headline}</p>
            <p className="text-xs text-gray-400 mt-1 line-clamp-1">{a.description}</p>
          </div>
        </motion.a>
      </AnimatePresence>
    </div>
  )
}

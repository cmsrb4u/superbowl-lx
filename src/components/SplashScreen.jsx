import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState('enter')
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 100)
    const t2 = setTimeout(() => setPhase('exit'), 3500)
    const t3 = setTimeout(() => onComplete(), 4500)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onComplete])

  return (
    <div onClick={() => { setPhase('exit'); setTimeout(onComplete, 600) }}
      className={`fixed inset-0 z-50 flex items-center justify-center cursor-pointer overflow-hidden transition-opacity duration-700 ${phase === 'exit' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      style={{ background: 'radial-gradient(ellipse at center, #1a2744 0%, #0a0f1a 60%, #000 100%)' }}>
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="flex items-center gap-6 sm:gap-16">
          <div className={`transition-all duration-1000 ease-out ${phase === 'enter' ? '-translate-x-32 opacity-0' : 'translate-x-0 opacity-100'}`}>
            <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full bg-seahawks-navy/40 border-2 border-seahawks-green/40 flex items-center justify-center backdrop-blur-sm p-3 sm:p-5">
              <img src="https://a.espncdn.com/i/teamlogos/nfl/500/sea.png" alt="Seahawks" className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(105,190,40,0.5)]" />
            </div>
          </div>
          <div className={`transition-all duration-700 delay-500 ${phase === 'enter' ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
            <span className="text-gold-accent text-3xl sm:text-5xl font-black italic">VS</span>
          </div>
          <div className={`transition-all duration-1000 ease-out ${phase === 'enter' ? 'translate-x-32 opacity-0' : 'translate-x-0 opacity-100'}`}>
            <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full bg-patriots-navy/40 border-2 border-patriots-red/40 flex items-center justify-center backdrop-blur-sm p-3 sm:p-5">
              <img src="https://a.espncdn.com/i/teamlogos/nfl/500/ne.png" alt="Patriots" className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(198,12,48,0.5)]" />
            </div>
          </div>
        </div>
        <div className={`text-center transition-all duration-1000 delay-300 ${phase === 'enter' ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`}>
          <div className="text-gold-accent text-sm sm:text-base font-bold uppercase tracking-[0.3em] mb-2">Super Bowl</div>
          <div className="text-6xl sm:text-8xl font-black text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 30%, #fff 50%, #fbbf24 70%, #d97706 100%)', WebkitBackgroundClip: 'text' }}>LX</div>
          <div className="text-gray-400 text-xs sm:text-sm mt-2 tracking-wider">February 8, 2026 · 6:30 PM ET</div>
        </div>
        <div className={`transition-all duration-1000 delay-700 ${phase === 'enter' ? 'opacity-0' : 'opacity-100'}`}>
          <div className="text-gray-500 text-xs tracking-widest uppercase animate-pulse">Tap anywhere to enter</div>
        </div>
      </div>
    </div>
  )
}

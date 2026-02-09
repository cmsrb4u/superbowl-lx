import { motion } from 'framer-motion'
import seahawkImg from '../assets/seahawk.png'
import patriotsImg from '../assets/new_england.png'

export default function HelmetShowdown() {
  return (
    <div className="relative w-full overflow-hidden py-8 md:py-12 pointer-events-none select-none">
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-dashboard-bg to-transparent z-10" />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div className="w-32 h-32 md:w-48 md:h-48 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.3) 0%, rgba(251,191,36,0.05) 50%, transparent 70%)' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <motion.span className="text-2xl md:text-4xl font-bold tracking-widest"
          style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 0 12px rgba(251,191,36,0.5))' }}
          animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>VS</motion.span>
      </div>
      <div className="relative z-10 flex items-center justify-center max-w-4xl mx-auto px-4">
        <motion.div className="flex-1 flex justify-end" initial={{ x: -200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1.2, type: 'spring', bounce: 0.3 }}>
          <motion.div animate={{ scaleX: [-1, -1.03, -1], scaleY: [1, 1.03, 1], x: [0, 6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
            <img src={patriotsImg} alt="New England Patriots helmet" className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 object-contain" style={{ filter: 'drop-shadow(0 0 25px rgba(198,12,48,0.5))' }} />
          </motion.div>
        </motion.div>
        <div className="w-24 md:w-36 shrink-0" />
        <motion.div className="flex-1 flex justify-start -ml-10" initial={{ x: 200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1.2, type: 'spring', bounce: 0.3 }}>
          <motion.div animate={{ scaleX: [-1, -1.03, -1], scaleY: [1, 1.03, 1], x: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
            <img src={seahawkImg} alt="Seattle Seahawks helmet" className="w-60 h-60 sm:w-72 sm:h-72 md:w-[22rem] md:h-[22rem] object-contain" style={{ filter: 'drop-shadow(0 0 25px rgba(105,190,40,0.5))' }} />
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-dashboard-bg to-transparent z-10" />
    </div>
  )
}

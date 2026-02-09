import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useGameData } from './hooks/useGameData'
import Background from './components/Background'
import SplashScreen from './components/SplashScreen'
import Scoreboard from './components/Scoreboard'
import KeyPlayers from './components/KeyPlayers'
import SuperBowlAds from './components/SuperBowlAds'
import NewsCarousel from './components/NewsCarousel'
import CurrentDrive from './components/CurrentDrive'
import DriveHistory from './components/DriveHistory'
import WinProbability from './components/WinProbability'
import PlayByPlay from './components/PlayByPlay'
import PlayerStats from './components/PlayerStats'
import TeamStats from './components/TeamStats'
import QuarterScores from './components/QuarterScores'
import HelmetShowdown from './components/HelmetShowdown'
import FadeInCard from './components/FadeInCard'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const dismiss = useCallback(() => { setShowSplash(false); window.scrollTo({ top: 0, behavior: 'instant' }) }, [])
  const { eventId, gameStatus, scores, clock, plays, playerStats, teamStats, winProbability, currentDrive, driveHistory, quarterScores, gameInfo, isLoading, consecutiveErrors } = useGameData()

  if (!isLoading && eventId === null) return (
    <div className="min-h-screen bg-dashboard-bg text-white flex items-center justify-center">
      <Background />
      <div className="text-center p-8 relative z-10 glass-panel rounded-2xl">
        <h1 className="text-4xl font-bold mb-4">Super Bowl LX</h1>
        <p className="text-gray-400">Game data not found. Coverage begins soon.</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen text-white relative overflow-hidden font-inter selection:bg-gold-accent/30">
      <AnimatePresence>{showSplash && <SplashScreen onComplete={dismiss} />}</AnimatePresence>
      <Background />

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 py-6">
        <div className="mb-8">
          <Scoreboard scores={scores} clock={clock} gameStatus={gameStatus} gameInfo={gameInfo} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <FadeInCard delay={150}><KeyPlayers playerStats={playerStats} scores={scores} /></FadeInCard>
          <FadeInCard delay={200}><SuperBowlAds /></FadeInCard>
          <FadeInCard delay={250}><NewsCarousel /></FadeInCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3 flex flex-col gap-6">
            <FadeInCard delay={200}><CurrentDrive currentDrive={currentDrive} /></FadeInCard>
            <FadeInCard delay={250}><DriveHistory driveHistory={driveHistory} /></FadeInCard>
            <FadeInCard delay={400}><WinProbability winProbability={winProbability} /></FadeInCard>
          </div>
          <div className="lg:col-span-6 flex flex-col gap-6">
            <FadeInCard delay={300}><PlayByPlay plays={plays} /></FadeInCard>
            <FadeInCard delay={700}><PlayerStats playerStats={playerStats} /></FadeInCard>
          </div>
          <div className="lg:col-span-3 flex flex-col gap-6">
            <FadeInCard delay={350}><TeamStats teamStats={teamStats} /></FadeInCard>
            <FadeInCard delay={450}><QuarterScores quarterScores={quarterScores} /></FadeInCard>
          </div>
        </div>
      </div>

      <HelmetShowdown />

      <AnimatePresence>
        {consecutiveErrors > 0 && (
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-4 right-4 z-50 px-4 py-2 rounded-lg glass-panel border-l-4 border-red-500 text-sm font-semibold">
            {consecutiveErrors >= 3 ? 'Connection Lost. Showing cached data.' : 'Reconnecting...'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

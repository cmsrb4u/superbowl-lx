function ordinal(n) { return n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th' }

export default function CurrentDrive({ currentDrive }) {
  if (!currentDrive) return (
    <div className="card-gold rounded-xl p-4">
      <h2 className="text-lg font-bold mb-3">Current Drive</h2>
      <p className="text-gray-400 text-sm">No active drive.</p>
    </div>
  )
  const { team, plays, yards, timeElapsed, down, distance, yardLine, isActive, result } = currentDrive
  return (
    <div className="card-gold rounded-xl p-4">
      <h2 className="text-lg font-bold mb-3">Current Drive</h2>
      <div className="text-sm font-semibold text-gold-accent mb-3">{team}</div>
      {isActive ? (
        <div className="flex flex-col gap-2">
          <div className="bg-slate-900/60 rounded-lg p-3 border border-slate-600/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gold-accent font-bold text-lg">{down}{ordinal(down)} & {distance}</span>
              <span className="text-gray-400 text-xs">Ball on {yardLine} yd line</span>
            </div>
            <div className="relative h-3 bg-gradient-to-r from-seahawks-green/20 via-slate-600/30 to-patriots-red/20 rounded-full overflow-hidden">
              <div className="absolute top-0 w-2.5 h-3 bg-gold-accent rounded-full shadow-lg transition-all duration-300" style={{ left: `${Math.max(0, Math.min(97, yardLine / 100 * 100))}%` }} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[['Plays', plays], ['Yards', yards], ['Time', timeElapsed]].map(([l, v]) => (
              <div key={l} className="bg-slate-900/40 rounded-lg p-2">
                <div className="text-xs text-gray-400">{l}</div>
                <div className="font-bold">{v}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-sm bg-slate-900/40 rounded-lg p-3 text-center">
          <span className="font-bold text-gold-accent text-lg">{result}</span>
        </div>
      )}
    </div>
  )
}

const STATS = [['totalYards','Total Yards'],['firstDowns','First Downs'],['turnovers','Turnovers'],['thirdDownPct','3rd Down %'],['redZonePct','Red Zone %'],['timeOfPossession','Time of Possession']]

export default function TeamStats({ teamStats }) {
  return (
    <div className="card-glass rounded-xl p-4">
      <h2 className="text-lg font-bold mb-3">Team Stats</h2>
      <div className="flex justify-between mb-3 text-sm font-semibold">
        <span className="text-seahawks-green">SEA</span>
        <span className="text-patriots-red">NE</span>
      </div>
      <div className="flex flex-col gap-3">
        {STATS.map(([key, label]) => {
          const a = parseFloat(teamStats.away?.[key]) || 0, h = parseFloat(teamStats.home?.[key]) || 0
          const total = a + h, aPct = total > 0 ? a / total * 100 : 50, hPct = total > 0 ? h / total * 100 : 50
          return (
            <div key={key}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{String(teamStats.away?.[key] ?? '-')}</span>
                <span className="text-gray-400 text-xs">{label}</span>
                <span className="font-medium">{String(teamStats.home?.[key] ?? '-')}</span>
              </div>
              <div className="flex h-1.5 rounded-full overflow-hidden bg-slate-700/50">
                <div className="bg-seahawks-green/70 transition-all duration-500" style={{ width: `${aPct}%` }} />
                <div className="bg-patriots-red/70 transition-all duration-500" style={{ width: `${hPct}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

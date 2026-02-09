const STAT_DEFS = {
  qb: { title: 'QB Comparison', labels: [['completionsAttempts','Comp/Att'],['yards','Yards'],['touchdowns','TDs'],['interceptions','INTs'],['rating','Rating']] },
  wr: { title: 'WR Comparison', labels: [['receptions','Rec'],['yards','Yards'],['touchdowns','TDs'],['targets','Targets']] },
  rb: { title: 'RB Comparison', labels: [['carries','Carries'],['yards','Yards'],['touchdowns','TDs'],['yardsPerCarry','YPC']] },
}

export default function PlayerStats({ playerStats }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {Object.entries(STAT_DEFS).map(([key, def]) => {
        const away = playerStats[key]?.away, home = playerStats[key]?.home
        return (
          <div key={key} className="card-glass rounded-xl p-4">
            <h3 className="text-sm font-bold text-gold-accent mb-3">{def.title}</h3>
            <div className="flex justify-between mb-2">
              <span className="text-seahawks-green font-semibold text-sm">{away?.name || 'N/A'}</span>
              <span className="text-patriots-red font-semibold text-sm">{home?.name || 'N/A'}</span>
            </div>
            <div className="flex flex-col gap-1">
              {def.labels.map(([k, label]) => (
                <div key={k} className="flex justify-between text-sm">
                  <span>{away?.stats?.[k] ?? '-'}</span>
                  <span className="text-gray-400 text-xs">{label}</span>
                  <span>{home?.stats?.[k] ?? '-'}</span>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function QuarterScores({ quarterScores }) {
  const q = quarterScores?.quarters || []
  return (
    <div className="card-glass rounded-xl p-4">
      <h2 className="text-lg font-bold mb-3">Quarter Breakdown</h2>
      {q.length === 0 ? <p className="text-gray-400 text-sm">No quarter data yet.</p> : (
        <table className="w-full text-sm">
          <thead><tr className="text-gray-400 border-b border-slate-700">
            <th className="py-1 text-left">Quarter</th>
            <th className="py-1 text-right text-seahawks-green">SEA</th>
            <th className="py-1 text-right text-patriots-red">NE</th>
          </tr></thead>
          <tbody>{q.map(r => (
            <tr key={r.quarter} className="border-b border-slate-700/50">
              <td className="py-1 text-gray-400">Q{r.quarter}</td>
              <td className="py-1 text-right">{r.awayScore}</td>
              <td className="py-1 text-right">{r.homeScore}</td>
            </tr>
          ))}</tbody>
        </table>
      )}
    </div>
  )
}

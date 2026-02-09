import { useRef, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { findSuperBowlId, fetchGameSummary, parseGameData, getRefreshInterval } from '../api'

export function useGameData() {
  const errCount = useRef(0)
  const wpCache = useRef([])

  const { data: eventId } = useQuery({ queryKey: ['scoreboard'], queryFn: findSuperBowlId, staleTime: Infinity, retry: 2 })

  const { data: rawData, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['gameSummary', eventId],
    queryFn: () => fetchGameSummary(eventId),
    enabled: !!eventId,
    refetchInterval: q => {
      const d = q.state.data
      return d ? getRefreshInterval(parseGameData(d).gameStatus) : 5000
    },
  })

  if (isError) errCount.current += 1
  if (isSuccess && rawData) errCount.current = 0

  const parsed = useMemo(() => rawData ? parseGameData(rawData) : null, [rawData])

  if (parsed?.winProbability?.length) {
    const existing = new Set(wpCache.current.map(w => w.gameTime))
    const newPts = parsed.winProbability.filter(w => !existing.has(w.gameTime))
    if (newPts.length) wpCache.current = [...wpCache.current, ...newPts]
  }

  const empty = { name: 'N/A', team: '', headshot: '', position: '', stats: {} }
  return {
    eventId: eventId ?? null,
    gameStatus: parsed?.gameStatus ?? 'pregame',
    scores: parsed?.scores ?? { home: { name: 'Home', abbreviation: 'HOM', score: 0, logo: '' }, away: { name: 'Away', abbreviation: 'AWY', score: 0, logo: '' } },
    clock: parsed?.clock ?? { quarter: 0, timeRemaining: '0:00', possession: null },
    plays: parsed?.plays ?? [],
    playerStats: parsed?.playerStats ?? { qb: { home: { ...empty, position: 'QB' }, away: { ...empty, position: 'QB' } }, wr: { home: { ...empty, position: 'WR' }, away: { ...empty, position: 'WR' } }, rb: { home: { ...empty, position: 'RB' }, away: { ...empty, position: 'RB' } } },
    teamStats: parsed?.teamStats ?? { home: { totalYards: 0, firstDowns: 0, turnovers: 0, thirdDownPct: '0%', redZonePct: '0%', timeOfPossession: '0:00', sacks: 0 }, away: { totalYards: 0, firstDowns: 0, turnovers: 0, thirdDownPct: '0%', redZonePct: '0%', timeOfPossession: '0:00', sacks: 0 } },
    winProbability: wpCache.current,
    currentDrive: parsed?.currentDrive ?? null,
    driveHistory: parsed?.driveHistory ?? [],
    quarterScores: parsed?.quarterScores ?? { quarters: [] },
    gameInfo: parsed?.gameInfo ?? { venue: '', venueLocation: '', broadcast: '', leaders: [] },
    isLoading,
    isError,
    consecutiveErrors: errCount.current,
  }
}

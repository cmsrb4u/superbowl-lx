import axios from 'axios'

const SCOREBOARD = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard'
const SUMMARY = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/summary'
const NEWS = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/news'

export async function findSuperBowlId() {
  const { data } = await axios.get(SCOREBOARD)
  const ev = (data?.events || []).find(e => {
    if ((e.name || '').toLowerCase().includes('super bowl')) return true
    for (const c of e.competitions || [])
      for (const n of c.notes || [])
        if ((n.headline || '').toLowerCase().includes('super bowl')) return true
    return false
  })
  if (!ev) throw new Error('Super Bowl LX not found')
  return ev.id
}

export async function fetchGameSummary(eventId) {
  const { data } = await axios.get(SUMMARY, { params: { event: eventId } })
  return data
}

export async function fetchNews() {
  const { data } = await axios.get(NEWS)
  return (data?.articles || [])
    .filter(a => {
      const t = `${a.headline || ''} ${a.description || ''}`.toLowerCase()
      return t.includes('super bowl') || t.includes('seahawks') || t.includes('patriots')
    })
    .slice(0, 10)
    .map(a => ({
      headline: a.headline || '',
      description: a.description || '',
      image: a.images?.[0]?.url || '',
      link: a.links?.web?.href || 'https://www.espn.com',
    }))
}

function getGamePhase(stateName, period) {
  const s = (stateName || '').toLowerCase()
  if (s.includes('pre')) return 'pregame'
  if (s.includes('final') || s.includes('post')) return 'final'
  if (s.includes('halftime')) return 'halftime'
  if (s.includes('in') || s.includes('progress')) {
    if (period >= 1 && period <= 4) return `q${period}`
    if (period > 4) return 'overtime'
  }
  return 'pregame'
}

export function parseGameData(raw) {
  const comp = raw?.header?.competitions?.[0]
  const status = comp?.status
  const period = status?.period || 0
  const phase = getGamePhase(status?.type?.name, period)
  const competitors = comp?.competitors || []
  const home = competitors.find(c => c.homeAway === 'home') || competitors[0] || {}
  const away = competitors.find(c => c.homeAway === 'away') || competitors[1] || {}

  const scores = {
    home: { name: home.team?.displayName || 'Home', abbreviation: home.team?.abbreviation || 'HOM', score: parseInt(home.score || '0'), logo: home.team?.logos?.[0]?.href || '' },
    away: { name: away.team?.displayName || 'Away', abbreviation: away.team?.abbreviation || 'AWY', score: parseInt(away.score || '0'), logo: away.team?.logos?.[0]?.href || '' },
  }

  const clock = { quarter: period, timeRemaining: status?.displayClock || '0:00', possession: home.possession ? 'home' : away.possession ? 'away' : null }

  const scoringIds = new Set((raw?.scoringPlays || []).map(p => String(p.id)))
  const plays = (raw?.plays?.allPlays || []).map(p => ({
    id: String(p.id || ''),
    description: p.text || p.description || '',
    down: p.start?.down || 0,
    distance: p.start?.distance || 0,
    yardLine: p.start?.yardLine || 0,
    isScoring: p.scoringPlay === true || scoringIds.has(String(p.id)),
    team: p.start?.team?.abbreviation || '',
    quarter: p.period?.number || 0,
    clock: p.clock?.displayValue || '0:00',
  }))

  const wp = (raw?.winprobability || []).map(w => ({
    gameTime: String(w.playId || w.sequenceNumber || ''),
    homeWinPct: Math.round((w.homeWinPercentage || 0) * 100),
    awayWinPct: Math.round((1 - (w.homeWinPercentage || 0)) * 100),
  }))

  const playerStats = parsePlayerStats(raw?.boxscore)
  const teamStats = parseTeamStats(raw?.boxscore)

  const drive = raw?.drives?.current
  const currentDrive = drive ? {
    team: drive.team?.abbreviation || '', plays: drive.plays?.length || 0,
    yards: drive.yards || 0, timeElapsed: drive.timeElapsed?.displayValue || '0:00',
    down: drive.start?.down || 0, distance: drive.start?.distance || 0,
    yardLine: drive.start?.yardLine || 0, isActive: drive.isComplete !== true,
    result: drive.result || null,
  } : null

  const driveHistory = (raw?.drives?.previous || []).map(d => ({
    team: d.team?.abbreviation || '', plays: d.plays?.length || 0,
    yards: d.yards || 0, timeElapsed: d.timeElapsed?.displayValue || '0:00',
    result: d.result || d.displayResult || '', quarter: d.start?.period?.number || 0,
  }))

  const qScores = parseQuarterScores(competitors)

  const leaders = []
  ;(raw?.leaders || comp?.leaders || []).forEach(l => {
    const ld = l.leaders?.[0]
    if (ld) leaders.push({ category: l.name || '', name: ld.athlete?.displayName || '', team: ld.team?.abbreviation || '', headshot: ld.athlete?.headshot?.href || '', value: ld.displayValue || '' })
  })

  const venue = raw?.gameInfo?.venue || comp?.venue || {}
  const broadcast = (comp?.broadcasts || []).flatMap(b => b.names || [b.name]).filter(Boolean)[0] || ''

  return { gameStatus: phase, scores, clock, plays, playerStats, teamStats, winProbability: wp, currentDrive, driveHistory, quarterScores: qScores, gameInfo: { venue: venue.fullName || '', venueLocation: [venue.address?.city, venue.address?.state].filter(Boolean).join(', '), broadcast, leaders } }
}

function parsePlayerStats(box) {
  const empty = { name: 'N/A', team: '', headshot: '', position: '', stats: {} }
  const result = { qb: { home: { ...empty }, away: { ...empty } }, wr: { home: { ...empty }, away: { ...empty } }, rb: { home: { ...empty }, away: { ...empty } } }
  ;(box?.players || []).forEach(p => {
    const side = p.homeAway === 'home' ? 'home' : 'away'
    const team = p.team?.abbreviation || ''
    ;(p.statistics || []).forEach(s => {
      const cat = (s.name || '').toLowerCase()
      const a = s.athletes?.[0]
      if (!a) return
      const st = a.stats || []
      if (cat === 'passing') result.qb[side] = { name: a.athlete?.displayName || 'N/A', team, headshot: a.athlete?.headshot?.href || '', position: 'QB', stats: { completionsAttempts: st[0] || '0/0', yards: parseInt(st[1] || '0'), touchdowns: parseInt(st[3] || '0'), interceptions: parseInt(st[4] || '0'), rating: parseFloat(st[7] || '0') } }
      if (cat === 'receiving') result.wr[side] = { name: a.athlete?.displayName || 'N/A', team, headshot: a.athlete?.headshot?.href || '', position: 'WR', stats: { receptions: parseInt(st[0] || '0'), yards: parseInt(st[1] || '0'), touchdowns: parseInt(st[3] || '0'), targets: parseInt(st[5] || '0') } }
      if (cat === 'rushing') result.rb[side] = { name: a.athlete?.displayName || 'N/A', team, headshot: a.athlete?.headshot?.href || '', position: 'RB', stats: { carries: parseInt(st[0] || '0'), yards: parseInt(st[1] || '0'), touchdowns: parseInt(st[3] || '0'), yardsPerCarry: parseFloat(st[4] || '0') } }
    })
  })
  return result
}

function parseTeamStats(box) {
  const def = { totalYards: 0, firstDowns: 0, turnovers: 0, thirdDownPct: '0%', redZonePct: '0%', timeOfPossession: '0:00', sacks: 0 }
  const r = { home: { ...def }, away: { ...def } }
  ;(box?.teams || []).forEach(t => {
    const side = t.homeAway === 'home' ? 'home' : 'away'
    const stats = t.statistics || []
    const get = n => stats.find(s => (s.name || '').toLowerCase() === n.toLowerCase())
    r[side] = { totalYards: parseInt(get('totalYards')?.displayValue || '0'), firstDowns: parseInt(get('firstDowns')?.displayValue || '0'), turnovers: parseInt(get('turnovers')?.displayValue || '0'), thirdDownPct: get('thirdDownEff')?.displayValue || '0%', redZonePct: (get('redZoneAttempts') || get('redZonePct'))?.displayValue || '0%', timeOfPossession: get('possessionTime')?.displayValue || '0:00', sacks: parseInt(get('sacks')?.displayValue || '0') }
  })
  return r
}

function parseQuarterScores(competitors) {
  const home = competitors.find(c => c.homeAway === 'home') || competitors[0] || {}
  const away = competitors.find(c => c.homeAway === 'away') || competitors[1] || {}
  const hls = home.linescores || [], als = away.linescores || []
  const len = Math.max(hls.length, als.length)
  const quarters = []
  for (let i = 0; i < len; i++) quarters.push({ quarter: i + 1, homeScore: parseInt(hls[i]?.displayValue || '0'), awayScore: parseInt(als[i]?.displayValue || '0') })
  return { quarters }
}

export function getRefreshInterval(phase) {
  if (['q1','q2','q3','q4','overtime'].includes(phase)) return 10000
  if (['pregame','halftime'].includes(phase)) return 30000
  if (phase === 'final') return false
  return 30000
}

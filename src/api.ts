export const getAllPlayers = async (): Promise<Player[]> => {
  const res = await fetch('http://localhost:3000/players', {
    cache: 'no-cache',
  })
  return res.json()
}

export const addPlayer = async (player: Player): Promise<Player> => {
  const res = await fetch('http://localhost:3000/players', {
    method: 'POST',
    body: JSON.stringify(player),
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  })
  return res.json()
}

export const deletePlayer = async (id: string) => {
  await fetch(`http://localhost:3000/players/${id}`, {
    method: 'DELETE',
    cache: 'no-cache',
  })
}

export const updatePlayer = async (player: Player): Promise<Player> => {
  const res = await fetch(`http://localhost:3000/players/${player.id}`, {
    method: 'PUT',
    body: JSON.stringify(player),
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  })
  return res.json()
}

export const getAllTeams = async (): Promise<Team[]> => {
  const res = await fetch('http://localhost:3000/teams', {
    cache: 'no-cache',
  })
  return res.json()
}

export const addTeam = async (team: Team): Promise<Team> => {
  const res = await fetch('http://localhost:3000/teams', {
    method: 'POST',
    body: JSON.stringify(team),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return res.json()
}

export const deleteTeam = async (id: string) => {
  await fetch(`http://localhost:3000/teams/${id}`, {
    method: 'DELETE',
  })
}

export const updateTeam = async (team: Team): Promise<Team> => {
  const res = await fetch(`http://localhost:3000/teams/${team.id}`, {
    method: 'PUT',
    body: JSON.stringify(team),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return res.json()
}

export const saveMatch = async (match: Match): Promise<Match> => {
  const res = await fetch('http://localhost:3000/matches', {
    method: 'POST',
    body: JSON.stringify(match),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return res.json()
}

export const getMatchById = async (matchId: string): Promise<Match> => {
  const res = await fetch(`http://localhost:3000/matches/${matchId}`)
  return res.json()
}

export const updateMatchTitle = async (
  matchId: string,
  match: Match,
): Promise<Match> => {
  const res = await fetch(`http://localhost:3000/matches/${matchId}`, {
    method: 'PUT',
    body: JSON.stringify(match),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return res.json()
}

import { getAllPlayers, getAllTeams, saveMatch } from '@/api'
import { NavBar } from '@/components/nav-bar'
import { Button } from '@/components/ui/button'
import { PlayersSection } from '@/pages/components/players-section'
import { TeamsSection } from '@/pages/components/teams-section'
import { useMutation, useQuery } from '@tanstack/react-query'
import { CogIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'

export default function HomePage() {
  const navigate = useNavigate()

  const { data: players } = useQuery({
    queryKey: ['players'],
    queryFn: getAllPlayers,
  })

  const { data: teams } = useQuery({
    queryKey: ['teams'],
    queryFn: getAllTeams,
  })

  const { mutate: saveMatchMutate } = useMutation({
    mutationFn: (match: Match) => saveMatch(match),
  })

  const suffleAndGenerateTeams = () => {
    if (!players || players.length !== 10) {
      return alert('Need 10 players to generate teams')
    }

    if (!teams || teams.length !== 2) {
      return alert('Need 2 teams to generate teams')
    }

    // Group players by level
    const levelGroups: { [key: number]: Player[] } = {}
    for (let i = 0; i < players.length; i++) {
      const player = players[i]
      const level = player.level

      if (!levelGroups[level]) {
        levelGroups[level] = []
      }
      levelGroups[level].push(player)
    }

    // Now check if there are players with level that are divisible by 2
    let levelRemainder = 0
    for (const level in levelGroups) {
      if (levelGroups[level].length % 2 !== 0) {
        levelRemainder++
      }
    }

    if (levelRemainder !== 0) {
      return alert(
        'Players with current level range cannot be divided equally to two teams.',
      )
    }

    // Now shuffle the players
    for (const level in levelGroups) {
      levelGroups[level] = levelGroups[level].sort(() => Math.random() - 0.5)
    }

    // Now generate the teams
    const team1: Player[] = []
    const team2: Player[] = []

    for (const level in levelGroups) {
      const playersInLevel = levelGroups[level]

      for (let i = 0; i < playersInLevel.length; i++) {
        if (i % 2 === 0) {
          team1.push(playersInLevel[i])
        } else {
          team2.push(playersInLevel[i])
        }
      }
    }

    // Now setup Id for the new match
    const matchId = `teams-${v4()}`

    // Now add the teams to the database
    const match = {
      id: matchId,
      name: 'Friday Futsal',
      teamsWithPlayers: [
        {
          id: team1[0].id,
          name: teams[0].name,
          players: team1,
        },
        {
          id: team2[0].id,
          name: teams[1].name,
          players: team2,
        },
      ],
    }
    saveMatchMutate(match, { onSuccess: () => navigate(`/${matchId}`) })
  }

  return (
    <div className="h-screen antialiased">
      <NavBar>
        <div className="text-2xl font-black">Friday Futsal</div>
      </NavBar>

      <main className="flex flex-col flex-1 py-4 container mx-auto gap-8">
        <div className="flex justify-end">
          <Button
            type="button"
            className="rounded-none"
            onClick={suffleAndGenerateTeams}
          >
            <CogIcon className="size-4" />
            Generate
          </Button>
        </div>
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-3">
            <PlayersSection />
          </div>
          <div className="col-span-2">
            <TeamsSection />
          </div>
        </div>
      </main>
    </div>
  )
}

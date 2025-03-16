import { getMatchById, updateMatchTitle } from '@/api'
import { MatchInfo } from '@/components/match-info'
import { NavBar } from '@/components/nav-bar'
import { PlayerItemMin } from '@/components/player-item-min'
import { Card, CardContent } from '@/components/ui/card'
import { useMutation, useQuery } from '@tanstack/react-query'
import { CopyIcon } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

export default function TeamGeneratePage() {
  const { matchId } = useParams<{ matchId: string }>()

  const { data: match, isLoading } = useQuery({
    queryKey: ['match', matchId],
    queryFn: () => getMatchById(matchId!),
  })

  const { mutate: mutateTitle } = useMutation({
    mutationFn: (title: string) =>
      updateMatchTitle(matchId!, { ...match!, name: title }),
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <NavBar>
        {match && (
          <MatchInfo
            name={match.name}
            playersCount={match.teamsWithPlayers.length}
            teamCount={match.teamsWithPlayers[0].players.length}
            onTitleEditPressed={mutateTitle}
          />
        )}
      </NavBar>

      <div className="flex flex-col container mx-auto py-8 gap-2">
        <div className="flex items-center gap-1">
          <h4 className="text-sm">Share Link</h4>
          <p className="text-xs">(public draw)</p>
        </div>

        <div className="flex">
          <input
            type="text"
            value={`${window.location.href}`}
            className="w-2/5 h-10 border px-4 bg-neutral-900"
            placeholder="https://example.com"
            disabled
          />
          <button
            className="size-10 flex items-center justify-center border border-l-0 cursor-pointer hover:opacity-80"
            onClick={async () => {
              await navigator.clipboard.writeText(window.location.href)
              toast.success('Link copied to clipboard')
            }}
          >
            <CopyIcon className="size-4" />
          </button>
        </div>

        <Card className="rounded-none mt-4">
          <CardContent className="grid grid-cols-2 gap-16 items-center">
            {match?.teamsWithPlayers.map((teamWithPlayers) => (
              <div className="flex flex-col gap-4" key={teamWithPlayers.id}>
                <div className="flex items-center gap-1">
                  <h2 className="font-bold text-2xl">
                    Team {teamWithPlayers.name}
                  </h2>
                  <p className="text-sm text-primary/80">
                    ({teamWithPlayers.players.length})
                  </p>
                </div>

                {teamWithPlayers.players.map((player, index) => (
                  <PlayerItemMin
                    key={player.id}
                    player={player}
                    index={index}
                  />
                ))}

                <div className="size-10 flex ml-auto">
                  <p className="text-lg text-primary/80 text-end">
                    {teamWithPlayers.players.reduce(
                      (acc, player) => acc + player.level,
                      0,
                    )}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

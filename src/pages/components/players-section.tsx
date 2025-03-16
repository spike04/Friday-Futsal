import { addPlayer, deletePlayer, getAllPlayers, updatePlayer } from '@/api'
import { PlayerItem } from '@/components/player-item'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { v4 } from 'uuid'

export const PlayersSection = () => {
  const queryClient = useQueryClient()

  const { data: players, isLoading } = useQuery({
    queryKey: ['players'],
    queryFn: getAllPlayers,
    staleTime: Infinity,
  })

  const { mutate: addPlayerMutate } = useMutation({
    mutationFn: addPlayer,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['players'] }),
  })

  const { mutate: updatePlayerMutate } = useMutation({
    mutationFn: updatePlayer,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['players'] }),
  })

  const { mutate: deletePlayerMutate } = useMutation({
    mutationFn: deletePlayer,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['players'] }),
  })

  const handlePlayerChange = useCallback(
    (player: Player) => {
      updatePlayerMutate(player)
    },
    [updatePlayerMutate],
  )

  const addNewPlayer = async () => {
    const id = v4()
    const player = { id, name: '', level: 0 }

    addPlayerMutate(player)
  }

  const handleDeletePlayer = async (id: string) => {
    const confirmation = confirm('Are you sure you want to delete this player?')

    if (confirmation) {
      deletePlayerMutate(id)
    }
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle>Players ({players?.length})</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-4">
        {players?.map((player, index) => (
          <PlayerItem
            key={player.id}
            player={player}
            index={index + 1}
            onValueChange={handlePlayerChange}
            onLevelChange={handlePlayerChange}
            onDeletePressed={() => handleDeletePlayer(player.id)}
          />
        ))}
        <div className="flex items-center">
          <div className="bg-neutral-600 border h-10 w-10 flex items-center justify-center border-r-0 hover:opacity-80 font-bold shrink-0">
            {players?.length}
          </div>
          <button
            className="bg-neutral-800 border h-10 px-4 w-full hover:opacity-80 cursor-pointer flex items-center transition-opacity"
            onClick={() => addNewPlayer()}
          >
            Add Player
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

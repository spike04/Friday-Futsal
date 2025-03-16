import { addTeam, deleteTeam, getAllTeams, updateTeam } from '@/api'
import { TeamItem } from '@/components/team-item'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { v4 } from 'uuid'

export const TeamsSection = () => {
  const queryClient = useQueryClient()

  const { data: teams, isLoading } = useQuery({
    queryKey: ['teams'],
    queryFn: getAllTeams,
    staleTime: Infinity,
  })

  const { mutate: addTeamMutate } = useMutation({
    mutationFn: addTeam,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['teams'] }),
  })

  const { mutate: updateTeamMutate } = useMutation({
    mutationFn: updateTeam,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['teams'] }),
  })

  const { mutate: deleteTeamMutate } = useMutation({
    mutationFn: deleteTeam,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['teams'] }),
  })

  const addNewTeam = () => {
    const id = v4()
    const team = { id, name: '' }

    addTeamMutate(team)
  }

  const handleTeamChange = useCallback(
    (team: Team) => {
      updateTeamMutate(team)
    },
    [updateTeamMutate],
  )

  const handleDeleteTeam = async (id: string) => {
    const confirmation = confirm('Are you sure you want to delete team?')

    if (confirmation) {
      deleteTeamMutate(id)
    }
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle>Teams</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-4">
        {teams?.map((team, index) => (
          <TeamItem
            key={team.id}
            team={team}
            index={index + 1}
            onValueChange={handleTeamChange}
            onDeletePressed={() => handleDeleteTeam(team.id)}
          />
        ))}
        <div className="flex items-center">
          <div className="bg-neutral-600 border h-10 w-10 flex items-center justify-center border-r-0 hover:opacity-80 font-bold shrink-0">
            {teams?.length}
          </div>
          <button
            className="bg-neutral-800 border h-10 px-4 w-full hover:opacity-80 cursor-pointer flex items-center transition-opacity"
            onClick={addNewTeam}
          >
            Add Team
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

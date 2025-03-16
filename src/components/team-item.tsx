import { XIcon } from 'lucide-react'
import { useState } from 'react'

export const TeamItem = ({
  team,
  index,
  onDeletePressed,
  onValueChange,
}: {
  team: Team
  index: number
  onValueChange: (team: Team) => void
  onDeletePressed: () => void
}) => {
  const [name, setName] = useState(team.name)

  const updateTeamName = () => {
    onValueChange({ ...team, name })
  }

  return (
    <div className="flex items-center">
      <button
        type="button"
        className="border h-10 w-10 flex items-center justify-center border-r-0 hover:opacity-80 cursor-pointer shrink-0"
        onClick={() => onDeletePressed()}
      >
        <XIcon className="size-4" />
      </button>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={updateTeamName}
        type="text"
        placeholder={`Team ${index}`}
        className="border h-10 px-4 w-full bg-neutral-900"
      />
    </div>
  )
}

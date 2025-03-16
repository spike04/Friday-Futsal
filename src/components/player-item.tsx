import { cn } from '@/lib/utils'
import { XIcon } from 'lucide-react'
import { useState } from 'react'

export const PlayerItem = ({
  player,
  index,
  onValueChange,
  onLevelChange,
  onDeletePressed,
}: {
  player: Player
  index: number
  onValueChange: (player: Player) => void
  onLevelChange: (player: Player) => void
  onDeletePressed: () => void
}) => {
  const [name, setName] = useState(player.name)

  const updatePlayerName = () => {
    onValueChange({ ...player, name })
  }

  const updatePlayerLevel = (level: number) => {
    onLevelChange({ ...player, level })
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center flex-1">
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
          onBlur={updatePlayerName}
          type="text"
          placeholder={`Player ${index}`}
          className="border h-10 px-4 w-full bg-neutral-900"
        />
      </div>

      <div className="h-10 flex items-center justify-center border">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={cn(
              'h-10 w-14 flex items-center justify-center cursor-pointer hover:scale-110 duration-200 transition-transform',
              player.level >= star && 'bg-red-500',
            )}
            onClick={() => updatePlayerLevel(star)}
          >
            {star}
          </button>
        ))}
      </div>
    </div>
  )
}

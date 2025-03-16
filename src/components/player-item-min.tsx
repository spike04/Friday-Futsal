import { cn } from '@/lib/utils'

type PlayerItemMinProps = {
  player: Player
  index: number
}

export const PlayerItemMin = ({ player, index }: PlayerItemMinProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center flex-1">
        <button
          type="button"
          className="border h-10 w-10 flex items-center justify-center border-r-0 hover:opacity-80 cursor-pointer shrink-0"
        >
          {index + 1}
        </button>
        <input
          readOnly
          type="text"
          value={player.name}
          className="border h-10 px-4 w-full bg-neutral-900"
        />
      </div>

      <div className="h-10 flex items-center justify-center border">
        <button
          type="button"
          className={cn(
            'h-10 w-14 flex items-center justify-center cursor-pointer hover:scale-110 duration-200 transition-transform bg-red-500',
          )}
        >
          {player.level}
        </button>
      </div>
    </div>
  )
}

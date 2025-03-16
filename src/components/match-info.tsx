import { CheckIcon, PencilIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

type MatchInfoProps = {
  name: string
  playersCount: number
  teamCount: number
  onTitleEditPressed: (title: string) => void
}

export const MatchInfo = ({
  name,
  playersCount,
  teamCount,
  onTitleEditPressed,
}: MatchInfoProps) => {
  const [title, setTitle] = useState(name)
  const [isEditing, setIsEditing] = useState(false)

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <Input
          className="w-[200px]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button
          size="icon"
          variant="ghost"
          onClick={() => {
            onTitleEditPressed(title)
            setIsEditing(false)
          }}
        >
          <CheckIcon className="size-4" />
        </Button>
      </div>
    )
  }
  return (
    <div className="flex gap-2">
      <div className="flex flex-col">
        <div className="text-2xl font-black">{title}</div>

        <span className="text-xs text-primary/40">
          {playersCount * teamCount}
          Players in {teamCount} Teams
        </span>
      </div>
      <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)}>
        <PencilIcon className="size-4" />
      </Button>
    </div>
  )
}

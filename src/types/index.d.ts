declare type Player = {
  id: string
  name: string
  level: number
}

declare type Team = {
  id: string
  name: string
}

declare type TeamsWithPlayers = {
  id: string
  name: string
  players: Player[]
}

declare type Match = {
  id: string
  name: string
  teamsWithPlayers: TeamsWithPlayers[]
}

import { SettingsState } from './../types/reducers/game-settings'

export interface IChatbar{
  showChatbar: boolean
}
export interface IChatData {
  userName: string
  msg: string
}

export interface IIssues {
  issueCard: CustomIssueInterface[]
  editIssueCard: CustomIssueInterface
}

export enum ModalType {
  kickModalWindow = 'kickModalWindow',
  createIssueModalWindow = 'createIssueModalWindow',
}

export enum TypeUser {
  master = 'master',
  member = 'member',
  observer = 'observer',
}

export enum locationPath {
  startPage = '/',
  lobbyPage = '/lobby',
  gamePage = '/game',
}
export interface IStateGlobal {
  modalWindow: boolean
  typeModalWindow: ModalType
  typeUser: TypeUser
  isEditIssue: boolean
  idDeletePlayer: number
}

export interface IStore {
  globalSettings: IStateGlobal
  settings: SettingsState
  issues: IIssues
  playerCards: IPlayer
  location: string
  alert: any
  game: IStateGame
  timer : ITimer
  score: any
  session: string
  chat:IChatData[]
}

export interface IPlayerForm {
  firstName: string
  lastName: string
  position: string
  image?: string
}

export interface IPlayerCard {
  photo?: string
  name?: string
  position?: string
  btnDelPlayer?: boolean
  above?: boolean
  id?: number
}

export interface IPlayer {
  playerCards: IPlayerCard[]
  ws: WebSocket | null
  id : number
}

export interface ISelectedCard {
  isSelected: boolean
  idCard: number
}

export interface IStateGame {
  selectedCardVote: ISelectedCard
  startTimer: boolean
  idCurrentIssue: string
  statGame : IStatiscicsGame
}

export interface ITimer {
  start: boolean
  stop: boolean
  restart: boolean
}

export interface IStatiscicsGame{
  results: IResponseResults[]
  showStatRound : boolean
}

export interface IScoreMember {
  members : IPlayerCard 
 points:  number
}

export interface IScore {
  score: IScoreMember[]
  
}  
export interface CustomIssueInterface {
  link: string
    title: string
    priority: 'Low' | 'Medium' | 'High'
    id?: string
  }
  export interface IStatiscics{
    cardStat : IStatiscicsCard[]
  }
  export interface IStatiscicsCard{
    percent : number 
    valueCard : string
    
  }
  
  export interface IResultCard{
    idIssue : string
    resultsVote: IStatiscicsCard[]
  }

  export interface IResults {
     rounds : IResultCard[]
    }
    export interface IStatiscicsRound{
      idIssue : string
      resultRound : IStatiscicsCard[]
    }

   export interface IResultsVote {
     resultsVote : number[]
     idIssue : string
   }

   export interface IResponseResults {
    idIssue : string
    resultsVote : number[]
   }
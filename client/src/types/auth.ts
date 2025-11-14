export interface LoginForm {
  email: string
  password: string
}

export type ApplicationStatus =
  | 'BEFORE_APPLICATION'
  | 'AFTER_APPLICATION'
  | 'NOT_APPLIED'
  | 'WINNER'
  | 'LOSER'

export interface UserInfo {
  userName: string
  applicationDeadline: string
  applicationStart: string
  announcementTime: string
  useDate: string
  status: ApplicationStatus
  roomName: string
  allocatedRoomName?: string
}

export interface UserContextType extends UserInfo {
  accessToken?: string
  setAccessToken?: (token: string) => void
}

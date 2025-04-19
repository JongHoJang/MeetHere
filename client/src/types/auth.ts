export interface LoginForm {
  email: string
  password: string
}

export interface UserInfo {
  userName: string
  applicationDeadline: string
  announcementTime: string
  useDate: string
  status: 'BEFORE_APPLICATION' | 'AFTER_APPLICATION' | 'APPROVED' | 'REJECTED'
  roomName: string | undefined
}

export interface UserContextType extends UserInfo {
  accessToken?: string
  setAccessToken?: (token: string) => void
}

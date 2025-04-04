// zustand로 상태관리

import { create } from 'zustand'

interface AuthState {
  isAuthenticated: boolean
  userId: string | null
  accessToken: string | null
  refreshToken: string | null
  userInfo: {
    userName: string
    status: string
    roomName: string
    useDate: string
    applicationDeadline: string
    announcementTime: string
  } | null
  login: (data: {
    userId: string
    accessToken: string
    refreshToken: string
  }) => void
  setUserInfo: (info: AuthState['userInfo']) => void
  logout: () => void
  initializeAuth: () => void
}

export const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  userId: null,
  accessToken: null,
  refreshToken: null,
  userInfo: null,

  // 로그인 한 유저 정보
  setUserInfo: info => set({ userInfo: info }),

  // 로그인
  login: ({ userId, accessToken, refreshToken }) => {
    localStorage.setItem('userId', userId)
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)

    set({
      isAuthenticated: true,
      userId,
      accessToken,
      refreshToken,
    })
  },

  // 로그아웃
  logout: () => {
    localStorage.clear()
    set({
      isAuthenticated: false,
      userId: null,
      accessToken: null,
      refreshToken: null,
    })
  },

  // localStorage에 저장된 토큰과 유저 정보를 꺼내서
  // Zustand의 상태에 다시 넣어주는 역할이야
  initializeAuth: () => {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    const userId = localStorage.getItem('userId')
    const userInfo = localStorage.getItem('userInfo')

    if (accessToken && refreshToken && userId) {
      set({
        isAuthenticated: true,
        accessToken,
        refreshToken,
        userId,
        userInfo: userInfo ? JSON.parse(userInfo) : null,
      })
    }
  },
}))

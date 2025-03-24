import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  email: string // 사용자 아이디
  userName: string // 사용자 이름
  // 여기에 email, role, accessToken 등도 추가 가능
}

interface AuthState {
  user: User | null // 현재 로그인한 사용자 정보
  setUser: (user: User) => void // 로그인할 때 호출
  clearUser: () => void // 로그아웃할 때 호출
}

// Zustand 스토어 생성
export const useAuthStore = create(
  persist<AuthState>(
    set => ({
      user: null,
      setUser: user => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'auth-storage', // localStorage 키
    }
  )
)

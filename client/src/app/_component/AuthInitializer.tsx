'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/app/store/useAuthStore'

const AuthInitializer = () => {
  const initializeAuth = useAuthStore(state => state.initializeAuth)

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  return null // 화면에 아무것도 렌더링하지 않음
}

export default AuthInitializer

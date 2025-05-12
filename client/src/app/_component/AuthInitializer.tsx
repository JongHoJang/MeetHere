'use client'

import { useEffect, useState } from 'react'
import { authStore } from '@/store/useAuthStore'

export const AuthInitializer = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const restoreAccessToken = async () => {
      const token = authStore.getState().accessToken
      if (!token) {
        try {
          const res = await fetch('/api/refresh-token', {
            method: 'POST',
            credentials: 'include',
          })
          const data = await res.json()
          authStore.getState().setAccessToken(data.accessToken)
          document.cookie = `accessToken=${data.accessToken}; path=/; max-age=3600`
        } catch {
          console.warn('refreshToken 인증 실패')
        }
      }
      setChecked(true)
    }

    restoreAccessToken()
  }, [])

  if (!checked) return null
  return <>{children}</>
}

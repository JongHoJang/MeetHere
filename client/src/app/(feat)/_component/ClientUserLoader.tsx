'use client'

import { ReactNode, useEffect } from 'react'
import { useUserStore } from '@/store/useUserStore'
import { getUserUsage } from '@/lib/api/user'

interface Props {
  children: ReactNode
}

const ClientUserLoader = ({ children }: Props) => {
  const { userInfo, setUserInfo } = useUserStore()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!userInfo) {
          const data = await getUserUsage()
          setUserInfo(data)
        }
      } catch (err) {
        console.error('유저 정보 로딩 실패', err)
      }
    }

    fetchUser()
  }, [userInfo, setUserInfo])
  return <>{children}</>
}

export default ClientUserLoader

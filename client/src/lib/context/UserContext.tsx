'use client'

import { createContext, useContext, useState } from 'react'
import { UserContextType } from '@/types/auth'

const UserContext = createContext<UserContextType | null>(null)

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUser must be used within <UserProvider>')
  return context
}

export const UserProvider = ({
  children,
  userInfo,
}: {
  children: React.ReactNode
  userInfo: Omit<UserContextType, 'setAccessToken'>
}) => {
  const [accessToken, setAccessToken] = useState(userInfo.accessToken)

  const contextValue: UserContextType = {
    ...userInfo,
    accessToken,
    setAccessToken, // setter 포함!
  }

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  )
}

'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import LogoutButton from '@/app/_component/button/LogoutButton'
import { useUserStore } from '@/store/useUserStore'
import { getAdminUserList } from '@/lib/api/admin'

const Header = () => {
  const { userInfo } = useUserStore()
  const [isClient, setIsClient] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsClient(true)
  }, [])

  // 단순히 ADMIN 권한이 있는지만 확인
  const { data: isAdmin } = useQuery({
    queryKey: ['check-admin', userInfo?.userName], // userInfo 의존성 추가
    queryFn: async () => {
      try {
        await getAdminUserList({})
        return true
      } catch (error) {
        return false
      }
    },
    enabled: !!userInfo?.userName,
    retry: false,
    refetchOnWindowFocus: false,
  })

  const handleClick = () => {
    const isLoggedIn = !!userInfo?.userName
    window.location.href = isLoggedIn ? '/main' : '/login'
  }

  // 현재 경로가 dashboard로 시작하는지 확인
  const isDashboard = pathname?.startsWith('/dashboard')

  console.log(
    '🔍 Header - isAdmin:',
    isAdmin,
    'userInfo:',
    userInfo,
    'isClient:',
    isClient
  )

  return (
    <header className="w-full bg-[#333] text-white z-50">
      <div className="flex flex-row max-w-web-main mx-auto items-center justify-between gap-2 md:py-5 py-3 px-4 md:px-0">
        <div
          onClick={handleClick}
          className="text-xl font-bold text-white cursor-pointer h-10 flex items-center"
        >
          🗳 여기서 만나
        </div>

        <div className="flex items-center gap-4">
          {isClient &&
            isAdmin &&
            (isDashboard ? (
              <Link
                href="/main"
                className="px-3 py-1.5 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
              >
                홈화면으로 돌아가기
              </Link>
            ) : (
              <Link
                href="/dashboard/leaders"
                className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
              >
                관리자 페이지
              </Link>
            ))}

          {isClient && !!userInfo?.userName && <LogoutButton />}
        </div>
      </div>
    </header>
  )
}

export default Header

'use client'

import React, { useEffect, useState } from 'react'
import LogoutButton from '@/app/_component/button/LogoutButton'
import { useUserStore } from '@/store/useUserStore'

const Header = () => {
  const { userInfo } = useUserStore()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleClick = () => {
    const isLoggedIn = !!userInfo?.userName
    window.location.href = isLoggedIn ? '/main' : '/login'
  }

  return (
    <header className="w-full bg-[#333] text-white z-50">
      <div className="flex flex-row max-w-web-main mx-auto items-center justify-between gap-2 md:py-5 py-3 px-4 md:px-0">
        <div
          onClick={handleClick}
          className="text-xl font-bold text-white cursor-pointer h-10 flex items-center"
        >
          🗳 여기서 만나
        </div>

        {/* 클라이언트 렌더링 후에만 로그아웃 버튼 표시 */}
        {isClient && !!userInfo?.userName && <LogoutButton />}
      </div>
    </header>
  )
}

export default Header

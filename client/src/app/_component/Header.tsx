'use client'

import React from 'react'
import LogoutButton from '@/app/_component/button/LogoutButton'
import { useUserStore } from '@/store/useUserStore'

const Header = () => {
  const { userInfo } = useUserStore()

  const isLoggedIn = !!userInfo?.userName

  return (
    <header className="w-full bg-[#333] text-white z-50">
      <div className="flex flex-row max-w-web-main mx-auto items-center justify-between gap-2 sm:py-5 py-3 px-4">
        <div
          onClick={() => {
            if (isLoggedIn) {
              window.location.href = '/main'
            } else {
              window.location.href = '/login'
            }
          }}
          className="text-xl font-bold text-white cursor-pointer"
        >
          🗳 여기서 만나
        </div>
        {/*로그인 시 로그아웃 제공*/}
        {isLoggedIn ? <LogoutButton /> : <></>}
        {/*  admin 계정인 경우 관리자 페이지 이동 버튼 제공 */}
      </div>
    </header>
  )
}

export default Header

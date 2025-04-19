'use client'

import React from 'react'
import LogoutButton from '@/app/_component/button/LogoutButton'
import { useUserStore } from '@/store/useUserStore'

const FeatHeader = () => {
  const { userInfo } = useUserStore()

  const isLoggedIn = !!userInfo?.userName

  return (
    <header className="h-20 bg-[#333] flex justify-center items-center">
      <div className="w-web-main h-full items-center justify-between flex flex-row px-4">
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

export default FeatHeader

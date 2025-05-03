'use client'

import SignUpButton from '@/app/_component/button/SignUpButton'
import React from 'react'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="h-screen flex flex-col justify-center items-center px-4 sm:px-0">
      <h1 className="text-xl sm:text-4xl font-bold mb-4 text-center">
        <span className="block sm:inline">404</span> 페이지를 찾을 수 없습니다
      </h1>
      <p className="text-md sm:text-lg">요청하신 페이지가 존재하지 않아요.</p>
      <p className="text-md sm:text-lg">메인화면으로 돌아가주세요.</p>

      <div className="mt-12 mb-10 w-full max-w-[380px] mx-auto px-4 sm:px-0">
        <SignUpButton
          buttonLabel={'돌아가기'}
          onClick={() => router.push('/main')}
        />
      </div>
    </div>
  )
}

'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

const FindIdPwButton = () => {
  const router = useRouter()

  return (
    <div className="flex justify-center gap-4">
      <button
        type="submit"
        className="underline"
        onClick={() => router.push('/findEmail')}
      >
        아이디 찾기
      </button>{' '}
      |
      <button
        type="submit"
        className="underline"
        onClick={() => router.push('/changePassword')}
      >
        비밀번호 변경
      </button>
    </div>
  )
}

export default FindIdPwButton

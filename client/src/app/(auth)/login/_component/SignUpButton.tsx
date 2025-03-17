'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

const SignUpButton = () => {
  const router = useRouter()

  return (
    <div>
      <button
        type="submit"
        className="underline"
        onClick={() => router.push('/signup')}
      >
        회원가입하기
      </button>
    </div>
  )
}

export default SignUpButton

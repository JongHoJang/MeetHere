'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import SignUpButton from '@/app/_component/button/SignUpButton'

interface Props {
  modalTitle: string
  modalDescription: string
  onClose: () => void
}

export default function ChangePasswordModal({
  modalTitle,
  modalDescription,
}: Props) {
  const router = useRouter()

  const handleMoveToLogin = () => {
    router.push('/login')
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-lg font-bold mb-2">{modalTitle}</h2>
      <p className="mb-4">{modalDescription}</p>

      <SignUpButton buttonLabel="로그인하러 가기" onClick={handleMoveToLogin} />
    </div>
  )
}

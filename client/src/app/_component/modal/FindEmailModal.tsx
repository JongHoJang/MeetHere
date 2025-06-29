'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import MoveButton from '@/app/_component/button/MoveButton'

interface Props {
  modalTitle: string
  modalDescription: string
  onClose: () => void
}

export default function FindEmailModal({
  modalTitle,
  modalDescription,
}: Props) {
  const router = useRouter()

  const handleMoveToLogin = () => {
    router.push('/login')
  }

  const handleMoveToFindPassword = () => {
    router.push('/changePassword')
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-lg font-bold mb-2">{modalTitle}</h2>
      <p className="mb-4">{modalDescription}</p>
      <div className="flex items-center justify-center gap-2 flex-col sm:flex-row">
        <MoveButton buttonLabel="로그인하러 가기" onClick={handleMoveToLogin} />

        <MoveButton
          buttonLabel="비밀번호 찾기(변경)"
          onClick={handleMoveToFindPassword}
        />
      </div>
    </div>
  )
}

'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

interface RedirectButtonProps {
  buttonLabel: string
  movePage: string
}

const RedirectButton: React.FC<RedirectButtonProps> = ({
  buttonLabel,
  movePage,
}) => {
  const router = useRouter()

  return (
    <div>
      <button
        type="button"
        className="h-[60px] w-[380px] bg-main-d-black transition-colors duration-200 hover:bg-[#444] rounded-[4px] text-white text-[18px] font-bold"
        onClick={() => router.push(movePage)}
      >
        {buttonLabel}
      </button>
    </div>
  )
}

export default RedirectButton

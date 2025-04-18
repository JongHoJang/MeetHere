'use client'

import React, { useState } from 'react'
import { reservationRoom } from '@/lib/api/roomController'
import { AxiosError } from 'axios'

interface ReserveButtonProps {
  buttonLabel: string
  roomId?: number | null
  roomName?: string | null
  onClick?: () => void // 모달 닫기
  onSuccess?: () => void // 성공 시 처리
  onFail?: () => void // 실패 시 처리
}

const ReserveButton: React.FC<ReserveButtonProps> = ({
  buttonLabel,
  roomId,
  onClick,
  onSuccess,
  onFail,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleReserve = async (roomId: number) => {
    if (isLoading) return // 중복 방지
    setIsLoading(true)

    try {
      await reservationRoom(roomId)
      // console.log('예약 성공:', data)
      onClick?.()
      onSuccess?.()
    } catch (e: unknown) {
      // console.log('예약 실패 catch로 들어옴')
      const error = e as AxiosError<{ message: string; errorCode: number }>
      console.log('에러 내용:', error.response?.data)
      onClick?.()
      onFail?.()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <button
        type="button"
        className="h-[60px] w-[380px] bg-main-d-black rounded-[4px] text-white text-[18px] font-bold transition-colors duration-200 hover:bg-[#444]"
        disabled={!roomId || isLoading}
        onClick={() => handleReserve(roomId!)}
      >
        {isLoading ? '예약 중...' : buttonLabel}
      </button>
    </div>
  )
}

export default ReserveButton

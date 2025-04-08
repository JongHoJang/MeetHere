import React from 'react'
import { reservationRoom } from '@/lib/api/roomController'
import { useAuthStore } from '@/app/store/useAuthStore'
import { redirect } from 'next/navigation'
import { AxiosError } from 'axios'

interface ReserveButtonProps {
  buttonLabel: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  roomId?: number | null
}

const ReserveButton: React.FC<ReserveButtonProps> = ({
  buttonLabel,
  type = 'button',
  roomId,
}) => {
  const accessToken = useAuthStore.getState().accessToken

  const handleReserve = async (roomId: number) => {
    try {
      const data = await reservationRoom(roomId, accessToken!)
      console.log(data)
    } catch (e: unknown) {
      const error = e as AxiosError<{ message: string; errorCode: number }>

      if (error.response?.data?.errorCode === 30004) {
        alert(error.response.data.message) // "신청은 월요일에만 가능합니다."
        redirect('/dashboard')
      } else {
        alert('예약에 실패했습니다.')
      }
    }
  }

  return (
    <div>
      <button
        type={type}
        className="h-[60px] w-[380px] bg-main-d-black rounded-[4px] text-white text-[18px] font-bold"
        disabled={!roomId}
        onClick={() => handleReserve(roomId!)}
      >
        {buttonLabel}
      </button>
    </div>
  )
}

export default ReserveButton

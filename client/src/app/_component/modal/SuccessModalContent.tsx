import React from 'react'

interface Props {
  movePage?: string
  onClose: () => void
  userName?: string
  roomName?: string | null
}

export default function SuccessModalContent({ onClose, roomName }: Props) {
  const handleConfirm = () => {
    onClose()
    window.location.href = '/main'
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-lg font-bold mb-2">
        {roomName}에 신청이 완료되었습니다.
      </h2>
      <p className="mb-4">월요일 21:00에 배정이 완료됩니다.</p>

      <button
        type="button"
        className="h-[30px] w-[150px] bg-main-d-black rounded-[4px] text-white text-sm font-bold"
        onClick={handleConfirm}
      >
        확인
      </button>
    </div>
  )
}

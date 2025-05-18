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
    <div className="text-center">
      <h2 className="text-xl font-bold mb-6">
        {roomName}에 신청이 완료되었습니다.
      </h2>
      <div className="mb-4 w-[320px] mx-auto">
        <p className="mb-4">월요일 21:11에 배정이 완료됩니다.</p>
      </div>
      <div className="w-full max-w-[300px] mx-auto">
        <div className="flex flex-col mt-5">
          <button
            type="button"
            className="w-full h-[60px] bg-main-d-black rounded-[4px] text-white text-sm font-bold hover:bg-[#444]"
            onClick={handleConfirm}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  )
}

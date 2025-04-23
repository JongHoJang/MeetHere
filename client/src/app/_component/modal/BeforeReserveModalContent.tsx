import React from 'react'
import ReserveButton from '@/app/_component/button/ReserveButton'

interface Props {
  modalTitle: string
  modalDescription: string
  onClose: () => void
  roomId?: number | null
  roomName?: string | null
  onSuccess: () => void
  onFail: () => void
}

export default function BeforeReserveModalContent({
  modalTitle,
  modalDescription,
  onClose,
  roomId,
  roomName,
  onSuccess,
  onFail,
}: Props) {
  const handleClose = () => {
    onClose()
  }

  return (
    <>
      <div className="text-center">
        <h2 className="text-xl font-bold mb-2">{modalTitle}</h2>
        <p className="mb-4">{modalDescription}</p>

        {/* 버튼 컨테이너 */}
        {/* 신청하기 버튼 */}
        <div className="w-full max-w-[300px] mx-auto">
          <ReserveButton
            buttonLabel="신청하기"
            roomId={roomId}
            roomName={roomName}
            onClick={onClose}
            onSuccess={onSuccess}
            onFail={onFail}
          />
        </div>

        {/* 다시 선택하기 버튼 */}
        <button
          type="button"
          className="w-[320px] text-md font-bold underline text-gray-600 hover:text-black transition"
          onClick={handleClose}
        >
          다시 선택하기
        </button>
      </div>
    </>
  )
}

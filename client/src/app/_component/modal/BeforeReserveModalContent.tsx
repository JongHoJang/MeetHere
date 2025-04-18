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
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-lg font-bold mb-2">{modalTitle}</h2>
        <p className="mb-4">{modalDescription}</p>
        <div className="flex flex-col justify-center items-center gap-3">
          <ReserveButton
            buttonLabel="신청하기"
            roomId={roomId}
            roomName={roomName}
            onClick={onClose}
            onSuccess={onSuccess}
            onFail={onFail}
          />
          <button
            type="button"
            className="text-md font-bold underline"
            onClick={handleClose}
          >
            다시 선택하기
          </button>
        </div>
      </div>
    </>
  )
}

import React from 'react'
import SignUpButton from '@/app/_component/button/SignUpButton'

interface Props {
  modalTitle: string
  modalDescription: string
  onClose: () => void
}

export default function NormalModalContent({
  modalTitle,
  modalDescription,
  onClose,
}: Props) {
  const handleClose = () => {
    onClose()
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-lg font-bold mb-2">{modalTitle}</h2>
        <p className="mb-4">{modalDescription}</p>
        <SignUpButton buttonLabel={'확인'} onClick={handleClose} />
      </div>
    </>
  )
}

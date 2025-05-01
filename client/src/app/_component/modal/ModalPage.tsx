import React from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="
          bg-white
          w-full
          sm:w-[512px]
          h-auto
          p-6 rounded shadow-md
          box-border
        "
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

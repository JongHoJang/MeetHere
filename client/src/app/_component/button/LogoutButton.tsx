'use client'

import { LogOut } from 'lucide-react'
import Modal from '@/app/_component/modal/ModalPage'
import React, { useState } from 'react'
import LogoutModal from '@/app/_component/modal/LogoutModal'

const LogoutButton = () => {
  const [isFailModalOpen, setIsFailModalOpen] = useState(false)

  const handleLogout = () => {
    setIsFailModalOpen(true)
  }

  return (
    <>
      <button
        className="sm:px-4 py-1 sm:py-2 h-[20px] sm:h-10 text-white md:bg-red-500 md:hover:bg-red-600 rounded-md flex items-center gap-2"
        onClick={handleLogout}
      >
        <span className="hidden sm:inline">로그아웃</span>
        <LogOut size={20} className="hidden sm:inline" />

        <LogOut size={20} className="sm:hidden" />
      </button>

      <Modal open={isFailModalOpen} onClose={() => setIsFailModalOpen(false)}>
        <LogoutModal
          onClose={() => setIsFailModalOpen(false)}
          modalTitle={'로그아웃을 하시겠어요?'}
          modalDescription={'확인을 누르면 현재 계정에서 로그아웃됩니다.'}
        />
      </Modal>
    </>
  )
}

export default LogoutButton

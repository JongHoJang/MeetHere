import React from 'react'
import { useRouter } from 'next/navigation'
import { logout } from '@/lib/api/auth'

interface Props {
  modalTitle: string
  modalDescription: string
  onClose: () => void
}

export default function LogoutModal({
  modalTitle,
  modalDescription,
  onClose,
}: Props) {
  const router = useRouter()

  const handleLogout = async () => {
    const logoutResult = await logout()

    if (logoutResult.success) {
      onClose() // 모달 닫기
      router.push('/login')
    } else {
      alert('로그아웃에 실패하였습니다. 다시 시도해주세요')
    }
  }

  return (
    <>
      <div className="text-center text-main-d-black">
        <h2 className="text-xl font-bold mb-6">{modalTitle}</h2>
        <div className="mb-4 w-[320px] mx-auto">
          <p className="mb-4">{modalDescription}</p>
        </div>
        <div className="w-full max-w-[300px] mx-auto">
          <div className="flex flex-col mt-5">
            <button
              type="button"
              className="w-full h-[60px] bg-main-d-black rounded-[4px] text-white text-sm font-bold hover:bg-[#444]"
              onClick={handleLogout}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

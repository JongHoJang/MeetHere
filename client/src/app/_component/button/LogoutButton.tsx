'use client'

import { useRouter } from 'next/navigation'
import { deleteCookie } from 'cookies-next'
import { LogOut } from 'lucide-react'

const LogoutButton = () => {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    deleteCookie('accessToken', { path: '/' })
    router.push('/login')
  }

  return (
    <button
      className="sm:px-4 py-1 sm:py-2 h-full sm:h-10 text-white md:bg-red-500 md:hover:bg-red-600 rounded-md flex items-center gap-2"
      onClick={handleLogout}
    >
      <span className="hidden sm:inline">로그아웃</span>
      <LogOut size={20} className="hidden sm:inline" />

      <LogOut size={20} className="sm:hidden" />
    </button>
  )
}

export default LogoutButton

import { useRouter } from 'next/navigation'

const LogoutButton = () => {
  const router = useRouter()

  const handleLogout = () => {
    router.push('/login')
  }

  return (
    <button
      className="px-4 py-2 h-10 text-white bg-red-500 hover:bg-red-600 rounded-md"
      onClick={handleLogout}
    >
      로그아웃
    </button>
  )
}

export default LogoutButton

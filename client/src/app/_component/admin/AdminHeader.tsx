'use client'

// import { useRouter } from 'next/navigation'

export function AdminHeader() {
  // const router = useRouter()

  // const handleLogout = () => {
  //   // 로그아웃 로직
  //   router.push('/login')
  // }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-900">
            여기서 만나 - 관리자
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {/*<button className="p-2 text-gray-400 hover:text-gray-600 relative">*/}
          {/*  <Bell size={20} />*/}
          {/*  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">*/}
          {/*    3*/}
          {/*  </span>*/}
          {/*</button>*/}

          {/*<div className="flex items-center gap-3">*/}
          {/*  <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">*/}
          {/*    <User size={16} className="text-gray-600" />*/}
          {/*  </div>*/}
          {/*  <span className="text-sm font-medium text-gray-700">관리자</span>*/}
          {/*  <button*/}
          {/*    onClick={handleLogout}*/}
          {/*    className="p-2 text-gray-400 hover:text-gray-600"*/}
          {/*  >*/}
          {/*    <LogOut size={16} />*/}
          {/*  </button>*/}
          {/*</div>*/}
        </div>
      </div>
    </header>
  )
}

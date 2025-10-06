'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { AdminSidebar } from '@/app/_component/admin/AdminSidebar'
import { getAdminUserList } from '@/lib/api/admin'
import { useUserStore } from '@/store/useUserStore'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { userInfo } = useUserStore()

  // ADMIN 권한 체크
  const { data: isAdmin, isLoading } = useQuery({
    queryKey: ['check-admin'],
    queryFn: async () => {
      try {
        await getAdminUserList({})
        return true
      } catch (error) {
        return false
      }
    },
    enabled: !!userInfo?.userName,
    retry: false,
  })

  // 권한이 없으면 메인으로 리디렉션
  useEffect(() => {
    if (!userInfo?.userName) {
      router.push('/login')
      return
    }

    if (!isLoading && isAdmin === false) {
      router.push('/main')
    }
  }, [isAdmin, isLoading, router, userInfo])

  // 로딩 중이거나 권한 없으면 로딩 화면
  if (isLoading || isAdmin === false || !userInfo?.userName) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-lg">권한을 확인하는 중...</div>
      </div>
    )
  }

  // ADMIN만 실제 레이아웃 표시
  return (
    <div className="min-h-screen bg-gray-50">
      {/*<AdminHeader />*/}
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}

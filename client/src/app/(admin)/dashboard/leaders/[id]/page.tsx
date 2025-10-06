'use client'

import { useQuery } from '@tanstack/react-query'
import { getAdminUserById } from '@/lib/api/admin'
import { useParams } from 'next/navigation'
import { LeaderForm } from '@/app/_component/admin/leaders/LeaderForm'

export default function EditLeaderPage() {
  const params = useParams()
  const userId = parseInt(params.id as string)

  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['admin', 'user', userId],
    queryFn: () => getAdminUserById(userId),
    enabled: !!userId,
  })

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i}>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-red-600">
            사용자 정보를 불러오는 중 오류가 발생했습니다.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            사용자가 존재하지 않거나 접근 권한이 없습니다.
          </p>
        </div>
      </div>
    )
  }

  return <LeaderForm mode="edit" userId={userId} initialData={userData} />
}

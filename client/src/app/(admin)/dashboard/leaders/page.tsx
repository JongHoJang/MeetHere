'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { LeaderTable } from '@/app/_component/admin/leaders/LeaderTable'
import { UserListParams } from '@/types/admin'
import { getAdminUserList } from '@/lib/api/admin'
import { LeaderSearchForm } from '@/app/_component/admin/leaders/LeaderSearchForm'

export default function LeadersPage() {
  // const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  // const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null)

  // 검색 및 필터 상태
  // const [searchParams, setSearchParams] = useState<UserListParams>({
  //   page: 1,
  //   pageSize: 10,
  //   community: undefined,
  //   nameKeyword: undefined,
  // })

  const [searchParams, setSearchParams] = useState<UserListParams>({
    page: 1,
    pageSize: 10,
    community: undefined,
    nameKeyword: undefined,
    status: undefined, // 🆕 상태 필터 초기값 추가
  })

  const { data, isLoading, error } = useQuery({
    queryKey: ['admin', 'users', searchParams],
    queryFn: () => getAdminUserList(searchParams),
    staleTime: 5 * 60 * 1000,
  })

  // 페이지 별 유저 리스트 보기
  console.log('유저 리스트:', data?.users)

  const handleSearch = (params: Partial<UserListParams>) => {
    setSearchParams(prev => ({
      ...prev,
      ...params,
      page: 1, // 검색시 첫 페이지로
    }))
  }

  const handlePageChange = (page: number) => {
    setSearchParams(prev => ({ ...prev, page }))
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">
          데이터를 불러오는 중 오류가 발생했습니다.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">리더 관리</h1>
        <Link
          href="/dashboard/leaders/add"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          리더 추가
        </Link>
      </div>

      {/* 검색 폼 */}
      <LeaderSearchForm onSearch={handleSearch} searchParams={searchParams} />

      {/* 테이블 */}
      <LeaderTable
        users={data?.users || []}
        isLoading={isLoading}
        pagination={{
          currentPage: data?.currentPage || 1,
          totalPages: data?.totalPages || 1,
          totalElements: data?.totalElements || 0,
          hasNext: data?.hasNext || false,
          hasPrevious: data?.hasPrevious || false,
        }}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

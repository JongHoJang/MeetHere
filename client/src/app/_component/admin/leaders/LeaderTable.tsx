'use client'

import { Edit, User, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Leader } from '@/types/admin'
import { getCommunityDisplayName } from '@/lib/utils/community'
import React from 'react'

interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalElements: number
  hasNext: boolean
  hasPrevious: boolean
}

interface LeaderTableProps {
  users: Leader[]
  isLoading: boolean
  pagination?: PaginationInfo // optional로 변경
  onPageChange: (page: number) => void
}

export function LeaderTable({
  users,
  isLoading,
  pagination,
  onPageChange,
}: LeaderTableProps) {
  // 기본값 설정
  const paginationData = pagination || {
    currentPage: 1,
    totalPages: 1,
    totalElements: 0,
    hasNext: false,
    hasPrevious: false,
  }

  // 📍 페이지 번호 배열 생성 함수
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5 // 보여줄 최대 페이지 수
    const { currentPage, totalPages } = paginationData

    if (totalPages <= maxVisiblePages) {
      // 전체 페이지가 5개 이하면 모두 표시
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // 전체 페이지가 5개 초과면 현재 페이지 중심으로 표시
      let startPage = Math.max(1, currentPage - 2)
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

      // 끝 페이지가 total에 가까우면 시작 페이지 조정
      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1)
      }

      // 첫 페이지 표시
      if (startPage > 1) {
        pages.push(1)
        if (startPage > 2) {
          pages.push('...')
        }
      }

      // 중간 페이지들 표시
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      // 마지막 페이지 표시
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push('...')
        }
        pages.push(totalPages)
      }
    }

    return pages
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="divide-y divide-gray-200">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="px-6 py-4 flex items-center justify-between"
            >
              <div className="flex items-center">
                <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="ml-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const getStatusBadge = (isSignedUp: boolean, deleted: boolean) => {
    if (deleted) {
      return (
        <span className="inline-flex px-2 text-xs font-semibold rounded-full bg-red-100 text-red-800">
          제외
        </span>
      )
    }
    return isSignedUp ? (
      <span className="inline-flex px-2 text-xs font-semibold rounded-full bg-green-100 text-green-800">
        가입완료
      </span>
    ) : (
      <span className="inline-flex px-2 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
        미가입
      </span>
    )
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">
          전체 {paginationData.totalElements}명
        </h3>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              사용자 정보
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              공동체
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              생년월일
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              상태
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              관리
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users && users.length > 0 ? (
            users
              .sort((a, b) => {
                // 🔧 1차 정렬: 공동체 순서
                const communityOrder = [
                  'JOSEPH',
                  'DAVID',
                  'ESTHER',
                  'JOSHUA',
                  'DANIEL',
                  'PRISCILLA',
                  'MOSES',
                ]
                const aIndex = communityOrder.indexOf(a.community)
                const bIndex = communityOrder.indexOf(b.community)

                // 공동체가 다르면 공동체 순서로 정렬
                if (aIndex !== bIndex) {
                  return aIndex - bIndex
                }

                // 🔧 2차 정렬: 같은 공동체 내에서 이름 순서
                return a.name.localeCompare(b.name, 'ko-KR')
              })
              .map(user => (
                <tr key={user.userId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getCommunityDisplayName(user.community)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.birthday}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(user.isSignedUp, user.deleted)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/dashboard/leaders/${user.userId}`}
                        className="text-blue-600 hover:text-blue-900"
                        title="편집"
                      >
                        <Edit size={16} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center">
                <User size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  사용자가 없습니다
                </h3>
                <p className="text-gray-500">검색 조건을 변경해보세요.</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 🎯 개선된 페이지네이션 */}
      {paginationData.totalElements > 0 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          {/* 모바일용 이전/다음 버튼 */}
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => onPageChange(paginationData.currentPage - 1)}
              disabled={!paginationData.hasPrevious}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              이전
            </button>
            <button
              onClick={() => onPageChange(paginationData.currentPage + 1)}
              disabled={!paginationData.hasNext}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              다음
            </button>
          </div>

          {/* 데스크톱용 페이지네이션 */}
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-medium">
                  {(paginationData.currentPage - 1) * 10 + 1}
                </span>
                {' - '}
                <span className="font-medium">
                  {Math.min(
                    paginationData.currentPage * 10,
                    paginationData.totalElements
                  )}
                </span>
                {' / '}
                <span className="font-medium">
                  {paginationData.totalElements}
                </span>
                {' 개'}
              </p>
            </div>

            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                {/* 이전 버튼 */}
                <button
                  onClick={() => onPageChange(paginationData.currentPage - 1)}
                  disabled={!paginationData.hasPrevious}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>

                {/* 페이지 번호들 */}
                {pageNumbers.map((page, index) => (
                  <React.Fragment key={index}>
                    {page === '...' ? (
                      <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                        ...
                      </span>
                    ) : (
                      <button
                        onClick={() => onPageChange(page as number)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                          paginationData.currentPage === page
                            ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                            : 'text-gray-900'
                        }`}
                      >
                        {page}
                      </button>
                    )}
                  </React.Fragment>
                ))}

                {/* 다음 버튼 */}
                <button
                  onClick={() => onPageChange(paginationData.currentPage + 1)}
                  disabled={!paginationData.hasNext}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { UserListParams, UserStatusType } from '@/types/admin'

interface LeaderSearchFormProps {
  onSearch: (params: Partial<UserListParams>) => void
  searchParams: UserListParams
}

export function LeaderSearchForm({
  onSearch,
  searchParams,
}: LeaderSearchFormProps) {
  const [nameKeyword, setNameKeyword] = useState(searchParams.nameKeyword || '')
  const [community, setCommunity] = useState(searchParams.community || '')
  // 🔧 타입을 명시적으로 지정
  const [status, setStatus] = useState<UserStatusType | ''>(
    searchParams.status || ''
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    console.log('🔍 검색 폼 제출:', {
      nameKeyword: nameKeyword || undefined,
      community: community || undefined,
      status: status || undefined,
    })

    onSearch({
      nameKeyword: nameKeyword || undefined,
      community: community || undefined,
      // 🔧 타입 변환
      status: status || undefined,
    })
  }

  const handleReset = () => {
    setNameKeyword('')
    setCommunity('')
    setStatus('') // 빈 문자열로 초기화
    onSearch({
      nameKeyword: undefined,
      community: undefined,
      status: undefined,
    })
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            이름 검색
          </label>
          <div className="relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={nameKeyword}
              onChange={e => setNameKeyword(e.target.value)}
              placeholder="이름을 입력하세요"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="min-w-[150px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            공동체
          </label>
          <select
            value={community}
            onChange={e => setCommunity(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">전체</option>
            <option value="JOSEPH">요셉</option>
            <option value="DAVID">다윗</option>
            <option value="ESTHER">에스더</option>
            <option value="JOSHUA">여호수아</option>
            <option value="DANIEL">다니엘</option>
            <option value="PRISCILLA">쁘아</option>
            <option value="MOSES">모세</option>
          </select>
        </div>

        <div className="min-w-[130px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            상태
          </label>
          <select
            value={status}
            onChange={e => setStatus(e.target.value as UserStatusType | '')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">전체</option>
            <option value="pending" className="text-yellow-600">
              미가입
            </option>
            <option value="completed" className="text-green-600">
              가입완료
            </option>
            <option value="deleted" className="text-red-600">
              제외
            </option>
          </select>
        </div>

        <div className="flex items-end gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            <Search size={16} />
            검색
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            초기화
          </button>
        </div>
      </form>
    </div>
  )
}

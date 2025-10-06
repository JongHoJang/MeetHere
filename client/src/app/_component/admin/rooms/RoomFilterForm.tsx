'use client'

import { useState } from 'react'
import { Filter } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getRoomList } from '@/lib/api/adminRoom'
import {
  RoomFilterParams,
  AVAILABILITY_OPTIONS, // DELETED_OPTIONS 제거
} from '@/types/room'

interface RoomFilterFormProps {
  onFilter: (params: RoomFilterParams) => void
  filterParams: RoomFilterParams
}

export function RoomFilterForm({
  onFilter,
  filterParams,
}: RoomFilterFormProps) {
  const [floor, setFloor] = useState(filterParams.floor || 'all')
  const [availableStatus, setAvailableStatus] = useState(
    filterParams.availableStatus || 'all'
  )

  // 동적으로 층 목록 가져오기
  const { data: roomsData = [] } = useQuery({
    queryKey: ['admin', 'rooms', 'floors'],
    queryFn: () => getRoomList(),
  })

  // 층 옵션 동적 생성
  const floorOptions = [
    { value: 'all', label: '전체 층' },
    ...Array.from(
      new Set(
        roomsData.flatMap(floorData => floorData.rooms.map(room => room.floor))
      )
    )
      .sort()
      .map(floor => ({
        value: floor,
        label: floor,
      })),
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    console.log('🔍 현재 availableStatus 값:', availableStatus) // 디버깅 추가
    console.log('🔍 availableStatus 타입:', typeof availableStatus) // 타입 확인
    console.log('🔍 DELETED와 같은가?:', availableStatus === 'DELETED') // 비교 결과

    let statusFilter: 'AVAILABLE' | 'UNAVAILABLE' | undefined
    let deletedFilter: boolean | undefined

    if (availableStatus === 'DELETED') {
      console.log('🗑️ DELETED 브랜치 실행됨') // 이 로그가 나오는지 확인
      deletedFilter = true
      statusFilter = undefined
    } else {
      console.log('✅ 일반 브랜치 실행됨') // 이 로그가 나오는지 확인
      deletedFilter = false

      if (availableStatus === 'all') {
        statusFilter = undefined
      } else {
        statusFilter = availableStatus as 'AVAILABLE' | 'UNAVAILABLE'
      }
    }

    const filterParams = {
      floor: floor === 'all' ? undefined : floor,
      availableStatus: statusFilter,
      deleted: deletedFilter,
    }

    console.log('🔍 최종 필터 파라미터:', filterParams)
    onFilter(filterParams)
  }

  const handleReset = () => {
    setFloor('all')
    setAvailableStatus('all')
    onFilter({
      floor: undefined,
      availableStatus: undefined,
      deleted: false, // 🔥 기본적으로 삭제된 것 제외
    })
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
        <div className="min-w-[150px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            층별 필터
          </label>
          <select
            value={floor}
            onChange={e => setFloor(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {floorOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-[150px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            상태 필터
          </label>
          <select
            value={availableStatus}
            onChange={e => setAvailableStatus(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {AVAILABILITY_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            <Filter size={16} />
            필터 적용
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

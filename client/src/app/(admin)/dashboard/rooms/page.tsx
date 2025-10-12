'use client'

import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, ToggleLeft, ToggleRight, RotateCcw } from 'lucide-react'
import { RoomFilterParams, AdminRoom, FloorRooms } from '@/types/room'
import {
  getRoomList,
  updateMultipleRooms,
  updateRoomStatus,
} from '@/lib/api/adminRoom'
import { RoomFilterForm } from '@/app/_component/admin/rooms/RoomFilterForm'
import { RoomCard } from '@/app/_component/admin/rooms/RoomCard'

export default function RoomsPage() {
  const queryClient = useQueryClient()
  const router = useRouter()

  // 상태 관리
  const [filterParams, setFilterParams] = useState<RoomFilterParams>({
    floor: undefined,
    availableStatus: undefined,
    deleted: false, // 🔥 기본적으로 삭제된 항목 제외
  })

  const [selectedRooms, setSelectedRooms] = useState<Set<number>>(new Set())
  const [allRooms, setAllRooms] = useState<AdminRoom[]>([]) // 화면 표시용 (필터링된 데이터)
  const [allRoomsForStats, setAllRoomsForStats] = useState<AdminRoom[]>([]) // 🔥 통계용 (전체 데이터)
  const [floorGroups, setFloorGroups] = useState<FloorRooms[]>([])

  // 🔥 통계용 전체 데이터 조회 (필터 없이)
  const { data: statsData } = useQuery({
    queryKey: ['admin', 'rooms', 'stats'],
    queryFn: () => getRoomList({}), // 필터 없이 전체 조회
    staleTime: 10 * 60 * 1000, // 10분간 캐시
  })

  // 화면 표시용 필터링된 데이터 조회
  const {
    data: roomData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['admin', 'rooms', filterParams],
    queryFn: () => getRoomList(filterParams),
    staleTime: 5 * 60 * 1000,
  })

  // 🔥 통계용 전체 데이터 설정
  useEffect(() => {
    if (statsData) {
      const allRoomsFlat = statsData.flatMap((floor: FloorRooms) => floor.rooms)
      setAllRoomsForStats(allRoomsFlat)
    }
  }, [statsData])

  // 화면 표시용 필터링된 데이터 설정
  useEffect(() => {
    if (roomData) {
      const rooms = roomData.flatMap((floor: FloorRooms) => floor.rooms)
      setAllRooms(rooms)
      setFloorGroups(roomData)
    }
  }, [roomData])

  const filteredRooms = allRooms

  // 소그룹실 상태 업데이트 뮤테이션
  const statusMutation = useMutation({
    mutationFn: ({
      roomId,
      status,
    }: {
      roomId: number
      status: 'AVAILABLE' | 'UNAVAILABLE'
    }) => updateRoomStatus(roomId, { availableStatus: status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'rooms'] })
      toast.success('소그룹실 상태가 업데이트되었습니다')
    },
    onError: (error: any) => {
      console.error('소그룹실 상태 업데이트 실패:', error)
      toast.error('소그룹실 상태 업데이트에 실패했습니다')
    },
  })

  // 일괄 업데이트 뮤테이션
  const batchMutation = useMutation({
    mutationFn: (data: {
      roomIds: number[]
      updateData: {
        availableStatus?: 'AVAILABLE' | 'UNAVAILABLE'
        deleted?: boolean
      }
    }) => updateMultipleRooms(data.roomIds, data.updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'rooms'] })
      setSelectedRooms(new Set())
      toast.success('선택된 소그룹실들이 업데이트되었습니다')
    },
    onError: (error: any) => {
      console.error('일괄 업데이트 실패:', error)
      toast.error('일괄 업데이트에 실패했습니다')
    },
  })

  // 핸들러 함수들
  const handleFilter = (newFilterParams: RoomFilterParams) => {
    console.log('🔍 필터 변경 전:', filterParams)
    console.log('🔍 필터 변경 후:', newFilterParams)
    setFilterParams(newFilterParams)
    setSelectedRooms(new Set())
  }

  const handleRoomSelection = (roomId: number, selected: boolean) => {
    const newSelected = new Set(selectedRooms)
    if (selected) {
      newSelected.add(roomId)
    } else {
      newSelected.delete(roomId)
    }
    setSelectedRooms(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedRooms.size === filteredRooms.length) {
      setSelectedRooms(new Set())
    } else {
      const allIds = new Set(filteredRooms.map(room => room.roomId))
      setSelectedRooms(allIds)
    }
  }

  const handleStatusToggle = (
    roomId: number,
    newStatus: 'AVAILABLE' | 'UNAVAILABLE'
  ) => {
    statusMutation.mutate({ roomId, status: newStatus })
  }

  const handleBatchStatusUpdate = (status: 'AVAILABLE' | 'UNAVAILABLE') => {
    if (selectedRooms.size === 0) {
      toast.error('선택된 소그룹실이 없습니다')
      return
    }

    batchMutation.mutate({
      roomIds: Array.from(selectedRooms),
      updateData: { availableStatus: status },
    })
  }

  const handleBatchDelete = () => {
    if (selectedRooms.size === 0) {
      toast.error('선택된 소그룹실이 없습니다')
      return
    }

    if (
      confirm(`선택된 ${selectedRooms.size}개의 소그룹실을 삭제하시겠습니까?`)
    ) {
      batchMutation.mutate({
        roomIds: Array.from(selectedRooms),
        updateData: { deleted: true },
      })
    }
  }

  const handleBatchRestore = () => {
    if (selectedRooms.size === 0) {
      toast.error('선택된 소그룹실이 없습니다')
      return
    }

    if (
      confirm(`선택된 ${selectedRooms.size}개의 소그룹실을 복구하시겠습니까?`)
    ) {
      batchMutation.mutate({
        roomIds: Array.from(selectedRooms),
        updateData: {
          deleted: false,
          availableStatus: 'AVAILABLE',
        },
      })
    }
  }

  // 🔥 통계 계산 - 항상 전체 데이터 기준으로!
  const stats = {
    total: allRoomsForStats.filter(room => !room.deleted).length, // 삭제 안된 전체: 26
    available: allRoomsForStats.filter(
      room => room.availableStatus === 'AVAILABLE' && !room.deleted
    ).length, // 사용 가능: 25
    unavailable: allRoomsForStats.filter(
      room => room.availableStatus === 'UNAVAILABLE' && !room.deleted
    ).length, // 사용 불가: 1
    deleted: allRoomsForStats.filter(room => room.deleted).length, // 삭제됨: 2
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h3 className="text-lg font-medium text-red-800 mb-2">
            데이터를 불러오는데 실패했습니다
          </h3>
          <p className="text-red-600">잠시 후 다시 시도해주세요.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">소그룹실 관리</h1>
          <p className="text-gray-600 mt-1">
            소그룹실의 상태를 관리하고 설정을 변경할 수 있습니다.
          </p>
        </div>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
          onClick={() => router.push('/dashboard/rooms/new')}
        >
          <Plus size={16} />
          소그룹실 추가
        </button>
      </div>

      {/* 🔥 통계 - 항상 전체 데이터 기준 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-md">
              <span className="text-blue-600 text-lg">🏢</span>
            </div>
            <div className="ml-3">
              <div>
                <span className="text-sm font-bold text-gray-500">
                  전체 소그룹실
                </span>
                <span className="text-xs font-medium text-gray-500">
                  (삭제 소그룹실 제외)
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-md">
              <span className="text-green-600 text-lg">✅</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-bold text-gray-500">사용 가능</p>
              <p className="text-2xl font-bold text-green-600">
                {stats.available}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-md">
              <span className="text-red-600 text-lg">❌</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-bold text-gray-500">사용 불가</p>
              <p className="text-2xl font-bold text-red-600">
                {stats.unavailable}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-gray-100 rounded-md">
              <span className="text-gray-600 text-lg">🗑️</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-bold text-gray-500">삭제됨</p>
              <p className="text-2xl font-bold text-gray-600">
                {stats.deleted}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 필터링 */}
      <RoomFilterForm onFilter={handleFilter} filterParams={filterParams} />

      {/* 일괄 작업 버튼들 */}
      {selectedRooms.size > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-blue-800">
              <span className="font-medium">{selectedRooms.size}개</span>의
              소그룹실이 선택되었습니다.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleBatchStatusUpdate('AVAILABLE')}
                disabled={batchMutation.isPending}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:opacity-50 flex items-center gap-1"
              >
                <ToggleRight size={14} />
                사용 가능으로 변경
              </button>
              <button
                onClick={() => handleBatchStatusUpdate('UNAVAILABLE')}
                disabled={batchMutation.isPending}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 disabled:opacity-50 flex items-center gap-1"
              >
                <ToggleLeft size={14} />
                사용 불가로 변경
              </button>
              <button
                onClick={() => handleBatchRestore()}
                disabled={batchMutation.isPending}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50 flex items-center gap-1"
              >
                <RotateCcw size={14} />
                복구
              </button>
              <button
                onClick={handleBatchDelete}
                disabled={batchMutation.isPending}
                className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 disabled:opacity-50 flex items-center gap-1"
              >
                <Trash2 size={14} />
                삭제
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 소그룹실 목록 - 층별 그룹핑 */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">
            소그룹실 목록 ({filteredRooms.length}개)
          </h3>
          <button
            onClick={handleSelectAll}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {selectedRooms.size === filteredRooms.length
              ? '전체 해제'
              : '전체 선택'}
          </button>
        </div>

        <div className="p-6">
          {isLoading ? (
            // 로딩 스켈레톤
            <div className="space-y-8">
              {[...Array(3)].map((_, i) => (
                <div key={i}>
                  <div className="h-6 bg-gray-200 rounded w-24 mb-4 animate-pulse" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(3)].map((_, j) => (
                      <div
                        key={j}
                        className="bg-gray-100 rounded-lg h-48 animate-pulse"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : floorGroups.length > 0 ? (
            // 층별로 그룹핑된 소그룹실 카드들
            <div className="space-y-8">
              {floorGroups.map(floorGroup => (
                <div key={floorGroup.floor}>
                  {/* 층 헤더 */}
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      🏢 {floorGroup.floor}
                      <span className="text-sm font-normal text-gray-500">
                        ({floorGroup.rooms.length}개)
                      </span>
                    </h4>
                  </div>

                  {/* 해당 층의 소그룹실 카드들 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {floorGroup.rooms.map(room => (
                      <RoomCard
                        key={room.roomId}
                        room={room}
                        isSelected={selectedRooms.has(room.roomId)}
                        onSelectionChange={handleRoomSelection}
                        onStatusToggle={handleStatusToggle}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // 빈 상태
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🏢</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                조건에 맞는 소그룹실이 없습니다
              </h3>
              <p className="text-gray-600">필터 조건을 변경해보세요.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

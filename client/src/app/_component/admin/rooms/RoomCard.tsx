'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AdminRoom } from '@/types/room'
import { Users, MapPin, Armchair, Grid3X3, Edit } from 'lucide-react'

interface RoomCardProps {
  room: AdminRoom
  isSelected: boolean
  onSelectionChange: (roomId: number, selected: boolean) => void
  onStatusToggle: (
    roomId: number,
    newStatus: 'AVAILABLE' | 'UNAVAILABLE'
  ) => void
}

export function RoomCard({
  room,
  isSelected,
  onSelectionChange,
  onStatusToggle,
}: RoomCardProps) {
  const [isToggling, setIsToggling] = useState(false)

  const getSittingTypeDisplay = (type: string) => {
    return type === 'CHAIR' ? '의자석' : '좌식'
  }

  const getSittingTypeIcon = (type: string) => {
    return type === 'CHAIR' ? <Armchair size={16} /> : <Grid3X3 size={16} />
  }

  const getStatusColor = (status: string) => {
    return status === 'AVAILABLE' ? 'text-green-600' : 'text-red-600'
  }

  const getStatusBgColor = (status: string) => {
    return status === 'AVAILABLE'
      ? 'bg-green-50 border-green-200'
      : 'bg-red-50 border-red-200'
  }

  const handleStatusToggle = async (e: React.MouseEvent) => {
    e.stopPropagation() // 🔥 카드 클릭 이벤트 방지
    setIsToggling(true)
    const newStatus =
      room.availableStatus === 'AVAILABLE' ? 'UNAVAILABLE' : 'AVAILABLE'

    try {
      await onStatusToggle(room.roomId, newStatus)
    } finally {
      setIsToggling(false)
    }
  }

  // 🔥 카드 클릭 핸들러 추가
  const handleCardClick = () => {
    // 삭제된 방도 선택 가능하게 변경 (조건 제거)
    onSelectionChange(room.roomId, !isSelected)
  }

  return (
    <div
      onClick={handleCardClick} // 🔥 카드 전체 클릭 가능
      className={`bg-white rounded-lg border-2 transition-all duration-200 cursor-pointer ${
        isSelected
          ? 'border-blue-500 shadow-md bg-blue-50' // 🔥 선택 시 배경색도 추가
          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
      } ${room.deleted ? 'opacity-70' : ''}`} // 🔥 cursor-not-allowed 제거, opacity만 조정
    >
      <div className="p-4">
        {/* 헤더: 체크박스 + 방 이름 + 수정 버튼 + 상태 토글 */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            {/* 🔥 체크박스는 시각적 표시용으로만 사용 */}
            <div
              className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                isSelected
                  ? 'bg-blue-600 border-blue-600'
                  : 'bg-white border-gray-300'
              }`}
            >
              {isSelected && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{room.name}</h3>
            {/* 🔥 수정 버튼 */}
            <Link
              href={`/dashboard/rooms/${room.roomId}`}
              onClick={e => e.stopPropagation()} // 🔥 카드 클릭 이벤트 방지
              className="text-blue-600 hover:text-blue-900 flex items-center gap-1 text-sm p-1 rounded hover:bg-blue-100 transition-colors"
              title="수정"
            >
              <Edit size={14} />
            </Link>
          </div>

          {/* 상태 토글 버튼 */}
          <div className="flex items-center space-x-2">
            <span
              className={`text-sm font-medium ${getStatusColor(room.availableStatus)}`}
            >
              {room.availableStatus === 'AVAILABLE' ? '사용 가능' : '사용 불가'}
            </span>
            <button
              onClick={handleStatusToggle} // 🔥 이미 stopPropagation 처리됨
              disabled={isToggling || room.deleted}
              className={`relative inline-flex items-center justify-center w-12 h-6 transition-colors duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50  ${
                room.availableStatus === 'AVAILABLE'
                  ? 'bg-green-500'
                  : 'bg-red-500'
              }`}
            >
              <span
                className={`absolute w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                  room.availableStatus === 'AVAILABLE'
                    ? 'translate-x-3'
                    : '-translate-x-3'
                }`}
              />
            </button>
          </div>
        </div>

        {/* 🔥 선택된 상태 표시 추가 */}
        {/*{isSelected && (*/}
        {/*  <div className="mb-3 px-3 py-1 bg-blue-100 border border-blue-200 rounded-md">*/}
        {/*    <p className="text-xs text-blue-800 font-medium">✓ 선택됨</p>*/}
        {/*  </div>*/}
        {/*)}*/}

        {/* 소그룹실 정보 */}
        <div
          className={`rounded-lg p-3 border ${getStatusBgColor(room.availableStatus)}`}
        >
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <MapPin size={16} className="text-gray-500" />
              <span className="text-gray-700">{room.floor}</span>
            </div>

            <div className="flex items-center space-x-2">
              {getSittingTypeIcon(room.sittingType)}
              <span className="text-gray-700">
                {getSittingTypeDisplay(room.sittingType)}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Users size={16} className="text-gray-500" />
              <span className="text-gray-700">
                최대 {room.personAffordableCount}명
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-500">📝</span>
              <span className="text-gray-700">
                신청 {room.groupAffordableCount}팀
              </span>
            </div>
          </div>

          {/* 비고 */}
          {room.note && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <p className="text-xs text-gray-600">{room.note}</p>
            </div>
          )}

          {/* 삭제된 방 표시 */}
          {room.deleted && (
            <div className="mt-2 pt-2 border-t border-red-200">
              <p className="text-xs text-red-600 font-medium">
                ⚠️ 삭제된 소그룹실
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

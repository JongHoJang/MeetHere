'use client'

import { useState } from 'react'
import { Room } from '@/types/room'
import RoomList from '@/app/(feat)/selectRoom/_component/RoomList'
import TabSelector from '@/app/(feat)/selectRoom/_component/TabSelector'

export default function SelectRoomContainer() {
  const [activeTab, setActiveTab] = useState<string>('b1') // 선택된 층
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)

  return (
    <div className="w-full">
      {/* 탭 버튼 영역 */}
      <TabSelector setActiveTab={setActiveTab} activeTab={activeTab} />

      {/* 선택된 층의 방 목록 */}
      <div className="p-4">
        <RoomList
          floor={activeTab}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
        />
      </div>
    </div>
  )
}

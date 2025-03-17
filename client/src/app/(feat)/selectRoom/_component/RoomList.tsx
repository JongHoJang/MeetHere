'use client'

import React from 'react'
import { Room } from '@/types/room'
import { RoomList as RoomData } from '@/constants/floorRoomList'

interface RoomListProps {
  floor: string
  selectedRoom: Room | null
  setSelectedRoom: React.Dispatch<React.SetStateAction<Room | null>>
}

const RoomList: React.FC<RoomListProps> = ({
  floor,
  selectedRoom,
  setSelectedRoom,
}) => {
  const rooms = RoomData.filter(room => room.floor === floor)

  // 방 선택 핸들러
  const handleRoomClick = (room: Room) => {
    setSelectedRoom((prevRoom: Room | null) =>
      prevRoom?.id === room.id ? null : room
    )
  }

  return (
    <div className="w-full mx-auto">
      <div className="grid grid-cols-5 gap-4">
        {rooms.map(room => (
          <div
            key={room.id}
            className="w-[120px] cursor-pointer"
            onClick={() => handleRoomClick(room)}
          >
            <div
              className={`flex flex-row w-[120px] h-[40px] rounded-[3px] items-center justify-center text-[14px] font-semibold transition 
              ${selectedRoom?.id === room.id ? 'bg-blue-500 text-white' : 'bg-[#ececec] hover:bg-gray-300'}`}
            >
              <div>{room.label}</div>
              <div>({room.maxCapacity}인)</div>
              &nbsp;<div>{room.isOndol ? '- 좌식' : ''}</div>
            </div>
            <div className="flex justify-end text-[12px]">
              {room.currentApplicants}명 신청
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RoomList

'use client'

import React, { Dispatch, SetStateAction } from 'react'
import { Room } from '@/types/room'

interface RoomCardProps {
  room: Room
  setSelectedRoom: Dispatch<SetStateAction<Room | null>>
  isSelected: boolean
}

const RoomCard: React.FC<RoomCardProps> = ({
  room,
  setSelectedRoom,
  isSelected,
}) => {
  const handleRoomClick = () => {
    setSelectedRoom(prev => (prev?.roomId === room.roomId ? null : room))
  }

  return (
    <div
      className={`flex flex-col w-[150px] h-full text-[14px] font-semibold rounded-[4px] transition cursor-pointer`}
      onClick={handleRoomClick}
    >
      <div
        className={`bg-gray-200 w-[150px] h-[50px] items-center justify-center flex hover:bg-gray-300 cursor-pointer
        ${isSelected ? '!bg-blue-600 text-white transition' : ''}
`}
      >
        <div className="flex flex-row items-center gap-1">
          <h3 className="flex text-sm font-semibold">{room.name}</h3>
          <div className="text-xs font-medium">
            {room.personAffordableCount === 100
              ? '/ 제한X'
              : `/ ~${room.personAffordableCount}명`}
          </div>
          <div className="text-xs font-medium">
            {room.sittingType === 'CHAIR' ? '' : '/ 좌식'}
          </div>{' '}
        </div>
      </div>
      <div className="flex justify-end text-[12px]">
        <p>
          예약 인원: {room.reservationCount} / {room.groupAffordableCount}
        </p>
      </div>
    </div>
  )
}

export default RoomCard

'use client'

import React from 'react'
import { Room } from '@/types/room'

interface RoomCardProps {
  room: Room
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  return (
    <div
      className={`flex flex-col w-[150px] h-full text-[14px] font-semibold rounded-[4px]`}
    >
      <div
        className={`w-[150px] h-[50px] items-center justify-center flex ${
          room.reservationCount > room.groupAffordableCount
            ? 'bg-red-200'
            : 'bg-gray-200'
        }`}
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
        <span
          className={
            room.reservationCount > room.groupAffordableCount
              ? 'text-red-500'
              : 'text-black'
          }
        >
          예약 인원: {room.reservationCount} / {room.groupAffordableCount}
        </span>
      </div>
    </div>
  )
}

export default RoomCard

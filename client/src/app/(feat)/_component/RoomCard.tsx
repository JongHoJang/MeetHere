'use client'

import React from 'react'
import { Room } from '@/types/room'

interface RoomCardProps {
  room: Room
  isSelected?: boolean
  onClick?: () => void
  clickable?: boolean
}

const RoomCard: React.FC<RoomCardProps> = ({
  room,
  isSelected = false,
  onClick,
  clickable = false,
}) => {
  return (
    <div>
      <div
        className={`transition rounded-[4px] shadow mb-1
          ${isSelected ? '!bg-blue-600 text-white' : ''}
          ${clickable ? 'cursor-pointer' : ''}
        `}
        onClick={clickable ? onClick : undefined}
      >
        <div className="h-[80px]">
          <div
            className={`font-bold text-center text-white mb-1 bg-gray-500 py-1 rounded-t`}
            // ${
            //   isSelected
            //     ? '!bg-blue-600 text-white'
            //     : room.reservationCount > room.groupAffordableCount
            //       ? 'bg-red-200'
            //       : 'bg-gray-200'
            // }
          >
            {room.name} {room.sittingType === 'CHAIR' ? '' : ' (좌식)'}
            {/*<div className="text-xs font-semibold">*/}
            {/*  {room.sittingType === 'CHAIR' ? '' : ' (좌식)'}*/}
            {/*</div>*/}
          </div>
          <div className="text-xs font-medium flex items-center justify-center pt-2">
            {room.personAffordableCount === 100
              ? '인원 제한 없음'
              : `${room.personAffordableCount}명 가능`}
          </div>
        </div>
      </div>

      {/*예약 인원 체크*/}
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

import React from 'react'
import { Room } from '@/types/room'
import RoomCard from '@/app/(feat)/selectRoom/_component/RoomCard'
import { Dispatch, SetStateAction } from 'react'

interface RoomListContainerProps {
  rooms: Room[]
  setSelectedRoom: Dispatch<SetStateAction<Room | null>>
  selectedRoom: Room | null
}

const RoomListContainer: React.FC<RoomListContainerProps> = ({
  rooms,
  setSelectedRoom,
  selectedRoom,
}) => {
  const floorList = Array.from(new Set(rooms.map(room => room.floor))).sort()

  return (
    <div className="space-y-8">
      {floorList.map(floor => {
        const roomsOnFloor = rooms.filter(room => room.floor === floor)
        return (
          <div key={floor}>
            <h2 className="text-lg font-bold mb-2">{floor}</h2>
            <div className="flex flex-wrap gap-4">
              {roomsOnFloor.map(room => (
                <RoomCard
                  key={room.roomId}
                  room={room}
                  setSelectedRoom={setSelectedRoom}
                  isSelected={room.roomId === selectedRoom?.roomId}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default RoomListContainer

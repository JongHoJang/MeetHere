import React from 'react'
import { Room } from '@/types/room'
import RoomCard from '@/app/(feat)/application-overview/_component/RoomCard'

interface RoomListContainerProps {
  rooms: Room[]
}

const RoomListContainer: React.FC<RoomListContainerProps> = ({ rooms }) => {
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
                <RoomCard key={room.roomId} room={room} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default RoomListContainer

import { Room } from '@/types/room'
import RoomCard from '@/app/(feat)/selectRoom/_component/RoomCard'
import { Dispatch, SetStateAction } from 'react'

interface RoomListContainerProps {
  rooms: Room[]
  setSelectedRoom: Dispatch<SetStateAction<Room | null>>
}

const RoomListContainer: React.FC<RoomListContainerProps> = ({
  rooms,
  setSelectedRoom,
}) => {
  return (
    <div className="flex flex-row w-full h-full flex-wrap items-center justify-between gap-4">
      {rooms.map(room => (
        <RoomCard
          key={room.roomId}
          room={room}
          setSelectedRoom={setSelectedRoom}
        />
      ))}
    </div>
  )
}

export default RoomListContainer

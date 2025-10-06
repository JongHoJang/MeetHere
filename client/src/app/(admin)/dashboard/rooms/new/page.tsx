'use client'

import { RoomForm } from '@/app/_component/admin/rooms/RoomForm'

export default function NewRoomPage() {
  return (
    <div className="p-6">
      <RoomForm mode="create" />
    </div>
  )
}

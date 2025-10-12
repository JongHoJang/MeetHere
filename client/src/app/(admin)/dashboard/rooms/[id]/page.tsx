'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { RoomForm } from '@/app/_component/admin/rooms/RoomForm'
import { getAdminRoomById } from '@/lib/api/adminRoom'

export default function EditRoomPage() {
  const params = useParams()
  const roomId = parseInt(params.id as string)

  const {
    data: roomData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['admin', 'room', roomId],
    queryFn: () => getAdminRoomById(roomId),
    enabled: !!roomId && !isNaN(roomId),
  })

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">
                소그룹실 정보를 불러오는 중...
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-md p-4">
          <h3 className="text-lg font-medium text-red-800 mb-2">
            데이터를 불러오는데 실패했습니다
          </h3>
          <p className="text-red-600">소그룹실 정보를 찾을 수 없습니다.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <RoomForm mode="edit" roomId={roomId} initialData={roomData} />
    </div>
  )
}

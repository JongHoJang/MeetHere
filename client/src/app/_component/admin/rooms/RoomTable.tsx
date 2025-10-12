'use client'

import { Edit, Trash2, Home, ToggleLeft, ToggleRight } from 'lucide-react'
import Link from 'next/link'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

interface Room {
  id: number
  name: string
  capacity: number
  location: string
  status: 'active' | 'inactive' | 'maintenance'
  description?: string
  createdAt: string
}

interface RoomTableProps {
  rooms: Room[]
  isLoading: boolean
}

export function RoomTable({ rooms, isLoading }: RoomTableProps) {
  const queryClient = useQueryClient()

  const toggleStatusMutation = useMutation({
    mutationFn: ({ roomId, status }: { roomId: number; status: string }) =>
      fetch(`/api/admin/rooms/${roomId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'rooms'] })
      toast.success('상태가 변경되었습니다')
    },
    onError: () => {
      toast.error('상태 변경 중 오류가 발생했습니다')
    },
  })

  const deleteRoom = useMutation({
    mutationFn: (roomId: number) =>
      fetch(`/api/admin/rooms/${roomId}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'rooms'] })
      toast.success('소그룹실이 삭제되었습니다')
    },
    onError: () => {
      toast.error('삭제 중 오류가 발생했습니다')
    },
  })

  const handleToggleStatus = (room: Room) => {
    const newStatus = room.status === 'active' ? 'inactive' : 'active'
    toggleStatusMutation.mutate({ roomId: room.id, status: newStatus })
  }

  const handleDelete = (roomId: number) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteRoom.mutate(roomId)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { text: '사용가능', className: 'bg-green-100 text-green-800' },
      inactive: { text: '사용중단', className: 'bg-red-100 text-red-800' },
      maintenance: {
        text: '점검중',
        className: 'bg-yellow-100 text-yellow-800',
      },
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    return (
      <span
        className={`inline-flex px-2 text-xs font-semibold rounded-full ${config.className}`}
      >
        {config.text}
      </span>
    )
  }

  if (isLoading) {
    return <div className="animate-pulse bg-white rounded-lg h-64"></div>
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              소그룹실 정보
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              위치
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              수용인원
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              상태
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              관리
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rooms?.map(room => (
            <tr key={room.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <Home size={20} className="text-gray-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {room.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {room.description}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {room.location}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {room.capacity}명
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(room.status)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleToggleStatus(room)}
                    className="text-blue-600 hover:text-blue-900"
                    title={room.status === 'active' ? '사용 중단' : '사용 시작'}
                  >
                    {room.status === 'active' ? (
                      <ToggleRight size={16} />
                    ) : (
                      <ToggleLeft size={16} />
                    )}
                  </button>
                  <Link
                    href={`/dashboard/rooms/${room.id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Edit size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(room.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

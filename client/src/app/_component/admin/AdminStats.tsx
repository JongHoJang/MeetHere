'use client'

import { useQuery } from '@tanstack/react-query'
import { Users, Home, Calendar, TrendingUp } from 'lucide-react'

export function AdminStats() {
  const { data: stats } = useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: () => fetch('/api/admin/stats').then(res => res.json()),
  })

  const statItems = [
    {
      name: '전체 리더',
      value: stats?.totalLeaders || 0,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      name: '소그룹실',
      value: stats?.totalRooms || 0,
      icon: Home,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      name: '이번 주 예약',
      value: stats?.weeklyReservations || 0,
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      name: '이용률',
      value: `${stats?.utilizationRate || 0}%`,
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map(item => {
        const Icon = item.icon
        return (
          <div key={item.name} className="bg-white rounded-lg p-6 shadow">
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${item.bgColor}`}>
                <Icon size={24} className={item.color} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{item.name}</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {item.value}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

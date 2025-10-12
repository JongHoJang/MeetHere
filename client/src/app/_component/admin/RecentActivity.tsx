'use client'

import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'
import { User, Home, Calendar } from 'lucide-react'

export function RecentActivity() {
  const { data: activities } = useQuery({
    queryKey: ['admin', 'recent-activities'],
    queryFn: () => fetch('/api/admin/activities').then(res => res.json()),
  })

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_registered':
        return <User size={16} className="text-blue-600" />
      case 'room_reserved':
        return <Calendar size={16} className="text-green-600" />
      case 'room_added':
        return <Home size={16} className="text-purple-600" />
      default:
        return <Calendar size={16} className="text-gray-600" />
    }
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">최근 활동</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {activities?.map((activity: any) => (
          <div
            key={activity.id}
            className="px-6 py-4 flex items-center justify-between"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {getActivityIcon(activity.type)}
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-900">{activity.description}</p>
                <p className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(activity.createdAt), {
                    addSuffix: true,
                    locale: ko,
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

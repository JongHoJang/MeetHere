'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Users, Home } from 'lucide-react'

const menuItems = [
  {
    name: '리더 관리',
    href: '/dashboard/leaders',
    icon: Users,
  },
  {
    name: '소그룹실 관리',
    href: '/dashboard/rooms',
    icon: Home,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white shadow-sm h-screen">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          <Link
            href="/dashboard/leaders"
            className="cursor-pointer hover:text-blue-600 transition-colors"
          >
            관리자 메뉴
          </Link>
        </h2>{' '}
      </div>
      <nav className="mt-6">
        {menuItems.map(item => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-6 py-3 text-sm font-medium ${
                isActive
                  ? 'text-blue-600 bg-blue-50 border-r-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} className="mr-3" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

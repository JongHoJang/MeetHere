import { create } from 'zustand'

interface AdminState {
  sidebarCollapsed: boolean
  setSidebarCollapsed: (collapsed: boolean) => void
  selectedLeaders: number[]
  setSelectedLeaders: (leaders: number[]) => void
  selectedRooms: number[]
  setSelectedRooms: (rooms: number[]) => void
}

export const useAdminStore = create<AdminState>(set => ({
  sidebarCollapsed: false,
  setSidebarCollapsed: collapsed => set({ sidebarCollapsed: collapsed }),
  selectedLeaders: [],
  setSelectedLeaders: leaders => set({ selectedLeaders: leaders }),
  selectedRooms: [],
  setSelectedRooms: rooms => set({ selectedRooms: rooms }),
}))

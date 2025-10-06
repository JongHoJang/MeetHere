// 기존 타입들
export interface Leader {
  userId: number
  userRole: 'ADMIN' | 'USER'
  name: string
  birthday: string
  churchMemberId: number
  email: string
  community: 'JOSEPH' | string
  isSignedUp: boolean
  deleted: boolean
}

export interface UserListResponse {
  users: Leader[]
  currentPage: number
  totalPages: number
  totalElements: number
  pageSize: number
  hasNext: boolean
  hasPrevious: boolean
}

// 🔧 UserStatusType에 'all' 추가
export type UserStatusType = 'all' | 'pending' | 'completed' | 'deleted'

// 🔧 USER_STATUS_OPTIONS도 수정
export const USER_STATUS_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: 'pending', label: '미가입' },
  { value: 'completed', label: '가입완료' },
  { value: 'deleted', label: '삭제' },
] as const

// UserListParams 인터페이스도 확인해서 수정
export interface UserListParams {
  page?: number
  pageSize?: number
  nameKeyword?: string
  community?: string
  status?: UserStatusType // 이제 'all'도 포함됨
}

export interface Room {
  roomId: number
  name: string
  floor: string
  personAffordableCount: number
  groupAffordableCount: number
  availableStatus: boolean
  sittingType: string
  reservationCount: number
  // setSelectedRoom: (roomId: number) => void
}

// export interface RoomList {
//   [roomId: string]: Room // ID를 키로 사용하여 개별 Room을 매핑
// }

// 어드민 룸 타입
export interface AdminRoom {
  roomId: number
  name: string
  floor: string
  personAffordableCount: number
  groupAffordableCount: number
  availableStatus: 'AVAILABLE' | 'UNAVAILABLE'
  sittingType: 'CHAIR' | 'FLOOR'
  deleted: boolean
  note: string
}

export interface FloorRooms {
  floor: string
  rooms: AdminRoom[] // 🔧 Room → AdminRoom
}

export type RoomListResponse = FloorRooms[]

export interface RoomFilterParams {
  floor?: string
  availableStatus?: 'AVAILABLE' | 'UNAVAILABLE' | 'all' | 'DELETED' // 'all'과 'DELETED' 추가
  deleted?: boolean
}

// 필터 옵션 상수

export const AVAILABILITY_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: 'AVAILABLE', label: '사용 가능' },
  { value: 'UNAVAILABLE', label: '사용 불가' },
  { value: 'DELETED', label: '삭제됨' }, // 🔥 새로 추가
]

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

export interface RoomList {
  [roomId: string]: Room // ID를 키로 사용하여 개별 Room을 매핑
}

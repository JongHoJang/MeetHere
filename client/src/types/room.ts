export interface Room {
  id: string // 방 ID (문자열)
  label: string // 방 이름
  floor: string // 층 정보
  maxCapacity: number // 최대 수용 인원
  currentApplicants: number // 현재 신청 인원
  isOndol: boolean // 좌식 여부
}

export interface RoomList {
  [roomId: string]: Room // ID를 키로 사용하여 개별 Room을 매핑
}

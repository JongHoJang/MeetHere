import { api } from '../axios'
import { useAuthStore } from '@/app/store/useAuthStore'

const accessToken = useAuthStore.getState().accessToken

// 방 정보 api
export const fetchRoomInfo = async (userId: string) => {
  const res = await api.get('/api/room/reservation/info')
  return res.data
}

// 이번주에 당첨된 사람들 리스트 api
export const usingRoomUserList = async (userId: string) => {
  const res = await api.get('/api/room/users')
  return res.data
}

// 방 예약 api
export const reservationRoom = async (userId: string, roomId: number) => {
  const res = await api.get('/api/room/reserve', {
    headers: {
      roomId: roomId,
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return res.data
}

// [
//   {
//     "roomId": 0,
//     "name": "string",
//     "floor": "string",
//     "personAffordableCount": 0,
//     "groupAffordableCount": 0,
//     "availableStatus": "UNAVAILABLE",
//     "sittingType": "CHAIR",
//     "reservationCount": 0
//   }
// ]

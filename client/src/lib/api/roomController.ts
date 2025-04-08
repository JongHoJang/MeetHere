import { api } from '../axios'

// 방 정보 api
export const fetchRoomInfo = async () => {
  const res = await api.get('/api/room/reservation/info')
  return res.data
}

// 이번주에 당첨된 사람들 리스트 api
export const usingRoomUserList = async () => {
  const res = await api.get('/api/room/users')
  return res.data
}

// 방 예약 api
export const reservationRoom = async (roomId: number, accessToken: string) => {
  const res = await api.post('/api/room/reserve', null, {
    params: {
      roomId,
    },
    headers: {
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

// 로그인한 유저 정보 api

import { api } from '../axios'

export const fetchUserUsage = async (userId: string) => {
  const res = await api.get('/api/user/usage', {
    headers: {
      'User-ID': userId,
    },
  })
  return res.data
}

//  "userName": "string",
//  "applicationDeadline": "2025-04-01T23:52:00.247Z",
//  "announcementTime": "2025-04-01T23:52:00.247Z",
//  "useDate": "2025-04-01",
//  "status": "NOT_APPLIED",
//  "roomName": "string"

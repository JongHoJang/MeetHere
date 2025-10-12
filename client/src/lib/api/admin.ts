import api from '@/lib/api/axios'
import { UserListParams, UserListResponse } from '@/types/admin'

// 관리자 - 사용자 목록 조회
export const getAdminUserList = async (
  params: UserListParams
): Promise<UserListResponse> => {
  try {
    const requestParams: any = {
      page: 1, // 클라이언트 사이드 필터링을 위해 항상 첫 페이지부터 가져옴
      pageSize: 1000, // 전체 데이터를 가져오기 위해 큰 값 설정
    }

    if (params.nameKeyword) {
      requestParams.nameKeyword = params.nameKeyword
    }

    if (params.community && params.community !== 'all') {
      requestParams.community = params.community
    }

    console.log('🚀 API 요청 파라미터:', requestParams)

    const res = await api.get('/api/admin/user/list', { params: requestParams })

    // 🔧 클라이언트 사이드에서 상태 필터링
    let filteredUsers = res.data.users

    if (params.status && params.status !== 'all') {
      filteredUsers = res.data.users.filter((user: any) => {
        switch (params.status) {
          case 'deleted':
            return user.deleted
          case 'completed':
            return !user.deleted && user.isSignedUp
          case 'pending':
            return !user.deleted && !user.isSignedUp
          default:
            return true
        }
      })
    }

    // 🔧 클라이언트 사이드 페이지네이션
    const currentPage = params.page || 1
    const pageSize = params.pageSize || 10
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

    const result = {
      users: paginatedUsers,
      currentPage: currentPage,
      totalPages: Math.ceil(filteredUsers.length / pageSize),
      totalElements: filteredUsers.length,
      pageSize: pageSize,
      hasNext: currentPage < Math.ceil(filteredUsers.length / pageSize),
      hasPrevious: currentPage > 1,
    }

    console.log('✅ API 응답 (필터링 후):', result)
    console.log(
      `📊 필터링 결과: 전체 ${res.data.users.length}개 → ${filteredUsers.length}개`
    )

    return result
  } catch (err) {
    console.error('❌ API 요청 실패:', err)
    throw err
  }
}

// 관리자 - 소그룹실 목록 조회 (나중에 필요할 때)
export const getAdminRoomList = async () => {
  try {
    const res = await api.get('/api/admin/rooms')
    return res.data
  } catch (err) {
    console.error('소그룹실 목록 불러오기 실패:', err)
    throw err
  }
}

// // 관리자 - 통계 조회
// export const getAdminStats = async () => {
//   try {
//     const res = await api.get('/api/admin/stats')
//     return res.data
//   } catch (err) {
//     console.error('관리자 통계 불러오기 실패:', err)
//     throw err
//   }
// }

// 유저 업데이트
export const updateAdminUser = async (
  userId: number,
  updateData: {
    name?: string
    birthday?: string
    churchMemberId?: number
    community?: string
    deleted?: boolean
  }
) => {
  try {
    const res = await api.put(`/api/admin/user/${userId}/update`, updateData)
    return res.data
  } catch (err) {
    console.error('사용자 정보 업데이트 실패:', err)
    throw err
  }
}

// 리더 추가
export const createAdminUser = async (userData: {
  name: string
  birthday: string
  churchMemberId: number
  community: string
}) => {
  try {
    const res = await api.post('/api/admin/user/create', userData)
    return res.data
  } catch (err) {
    console.error('사용자 생성 실패:', err)
    throw err
  }
}

// 특정 사용자 정보 조회
export const getAdminUserById = async (userId: number) => {
  try {
    const res = await api.get(`/api/admin/user/${userId}`)
    return res.data
  } catch (err) {
    console.error('사용자 정보 불러오기 실패:', err)
    throw err
  }
}

// 사용자 소프트 딜리트 (deleted: true로 설정)
export const softDeleteAdminUser = async (
  userId: number,
  userData: {
    name: string
    birthday: string
    churchMemberId: number
    community: string
  }
) => {
  try {
    const res = await api.put(`/api/admin/user/${userId}/update`, {
      ...userData,
      deleted: true,
    })
    return res.data
  } catch (err) {
    console.error('사용자 삭제 실패:', err)
    throw err
  }
}

import api from '@/lib/api/axios'
import { AdminRoom, FloorRooms, RoomFilterParams } from '@/types/room'

// 소그룹실 생성용 타입
export interface CreateRoomRequest {
  name: string
  floor: string
  personAffordableCount: number
  groupAffordableCount: number
  availableStatus: 'AVAILABLE' | 'UNAVAILABLE'
  sittingType: 'CHAIR' | 'FLOOR'
  note: string
}

export type UpdateRoomRequest = {
  name: string
  floor: string
  personAffordableCount: number
  groupAffordableCount: number
  availableStatus: 'AVAILABLE' | 'UNAVAILABLE'
  sittingType: 'CHAIR' | 'FLOOR'
  note?: string
  deleted: boolean
}

// 소그룹실 생성
export const createAdminRoom = async (
  data: CreateRoomRequest
): Promise<AdminRoom> => {
  const response = await api.post('/api/admin/room/create', data)
  return response.data
}

// 소그룹실 수정
export const updateAdminRoom = async (
  roomId: number,
  data: UpdateRoomRequest
): Promise<AdminRoom> => {
  const response = await api.put(`/api/admin/room/${roomId}/update`, data)
  return response.data
}

// 특정 소그룹실 정보 조회
export const getAdminRoomById = async (roomId: number): Promise<AdminRoom> => {
  try {
    console.log('🚀 소그룹실 상세 조회 API 요청:', roomId)
    const res = await api.get(`/api/admin/room/${roomId}`)
    console.log('✅ 소그룹실 상세 조회 API 응답:', res.data)
    return res.data
  } catch (err) {
    console.error('❌ 소그룹실 상세 조회 실패:', err)
    throw err
  }
}

// 🔧 소그룹실 목록 조회 (필터링 지원)
export const getRoomList = async (
  params: RoomFilterParams = {}
): Promise<FloorRooms[]> => {
  try {
    const requestParams: any = {}

    if (params.floor && params.floor !== 'all') {
      requestParams.floor = params.floor
    }

    if (params.availableStatus && params.availableStatus !== 'all') {
      requestParams.availableStatus = params.availableStatus
    }

    console.log('🚀 소그룹실 목록 API 요청 파라미터:', requestParams)

    const res = await api.get('/api/admin/room/list', { params: requestParams })

    console.log('✅ 소그룹실 목록 API 응답:', res.data)

    // 🔥 통계 계산 (필터링 전 원본 데이터로)
    // const allRooms = res.data.flatMap((floor: any) => floor.rooms)
    // const stats = {
    //   total: allRooms.filter((room: any) => !room.deleted).length,
    //   available: allRooms.filter(
    //     (room: any) => room.availableStatus === 'AVAILABLE' && !room.deleted
    //   ).length,
    //   unavailable: allRooms.filter(
    //     (room: any) => room.availableStatus === 'UNAVAILABLE' && !room.deleted
    //   ).length,
    //   deleted: allRooms.filter((room: any) => room.deleted).length,
    // }

    let filteredData = res.data

    // 🗑️ 삭제 상태 필터링 (맨 먼저 처리)
    console.log('🔍 삭제 필터 파라미터:', params.deleted)

    if (params.deleted === true) {
      // "삭제됨" 필터 선택 시: 삭제된 항목만
      filteredData = filteredData
        .map((floorData: any) => ({
          ...floorData,
          rooms: floorData.rooms.filter((room: any) => room.deleted === true),
        }))
        .filter((floorData: any) => floorData.rooms.length > 0)
      console.log('🗑️ 삭제된 항목만 필터링:', filteredData)
    } else if (params.deleted === false) {
      // 기본 상태: 삭제되지 않은 항목만
      filteredData = filteredData
        .map((floorData: any) => ({
          ...floorData,
          // 🔥 수정: 명시적으로 false인 것만 포함
          rooms: floorData.rooms.filter((room: any) => room.deleted === false),
        }))
        .filter((floorData: any) => floorData.rooms.length > 0)
      console.log('✅ 삭제되지 않은 항목만 필터링:', filteredData)
    }
    // params.deleted === undefined인 경우는 전체 (필터링 안함)

    // 1️⃣ 층 필터링
    if (params.floor && params.floor !== 'all') {
      filteredData = filteredData.filter(
        (floorData: any) => floorData.floor === params.floor
      )
      console.log('🏢 층 필터링 후:', filteredData)
    }

    // 2️⃣ 사용 가능 여부 필터링
    if (params.availableStatus && params.availableStatus !== 'all') {
      filteredData = filteredData
        .map((floorData: any) => ({
          ...floorData,
          rooms: floorData.rooms.filter(
            (room: any) => room.availableStatus === params.availableStatus
          ),
        }))
        .filter((floorData: any) => floorData.rooms.length > 0)

      console.log('✅ 사용 가능 여부 필터링 후:', filteredData)
    }

    console.log('🔥 최종 필터링 결과:', filteredData)
    return filteredData
  } catch (err) {
    console.error('❌ 소그룹실 목록 불러오기 실패:', err)
    throw err
  }
}

// 🔧 소그룹실 상태만 업데이트 (간단 버전)
export const updateRoomStatus = async (
  roomId: number,
  updateData: { availableStatus: 'AVAILABLE' | 'UNAVAILABLE' }
) => {
  try {
    console.log('🚀 소그룹실 상태 업데이트 API 요청:', { roomId, updateData })

    // 🔧 기존 데이터를 먼저 가져와서 상태만 변경
    const currentRoom = await getAdminRoomById(roomId)

    const fullUpdateData: UpdateRoomRequest = {
      name: currentRoom.name,
      floor: currentRoom.floor,
      personAffordableCount: currentRoom.personAffordableCount,
      groupAffordableCount: currentRoom.groupAffordableCount,
      sittingType: currentRoom.sittingType,
      availableStatus: updateData.availableStatus, // 이것만 변경
      deleted: currentRoom.deleted,
      note: currentRoom.note,
    }

    const res = await api.put(
      `/api/admin/room/${roomId}/update`,
      fullUpdateData
    )
    console.log('✅ 소그룹실 상태 업데이트 API 응답:', res.data)
    return res.data
  } catch (err) {
    console.error('❌ 소그룹실 상태 업데이트 실패:', err)
    throw err
  }
}

// 🔧 소그룹실 일괄 업데이트 (개별 처리)
export const updateMultipleRooms = async (
  roomIds: number[],
  updateData: {
    availableStatus?: 'AVAILABLE' | 'UNAVAILABLE'
    deleted?: boolean
  }
) => {
  try {
    console.log('🚀 소그룹실 일괄 업데이트 시작:', { roomIds, updateData })

    // 각 소그룹실을 개별적으로 업데이트
    const promises = roomIds.map(async roomId => {
      // 현재 데이터 가져오기
      const currentRoom = await getAdminRoomById(roomId)

      // 🔥 deleted가 true면 자동으로 availableStatus를 UNAVAILABLE로 설정
      let finalAvailableStatus =
        updateData.availableStatus || currentRoom.availableStatus
      if (updateData.deleted === true) {
        finalAvailableStatus = 'UNAVAILABLE' // 삭제되면 자동으로 사용 불가
        console.log(
          `🗑️ 소그룹실 ${roomId} 삭제로 인해 상태를 UNAVAILABLE로 변경`
        )
      }

      // 변경할 필드만 업데이트
      const fullUpdateData: UpdateRoomRequest = {
        name: currentRoom.name,
        floor: currentRoom.floor,
        personAffordableCount: currentRoom.personAffordableCount,
        groupAffordableCount: currentRoom.groupAffordableCount,
        sittingType: currentRoom.sittingType,
        availableStatus: finalAvailableStatus, // 🔥 삭제 시 자동으로 UNAVAILABLE
        deleted:
          updateData.deleted !== undefined
            ? updateData.deleted
            : currentRoom.deleted,
        note: currentRoom.note,
      }

      return updateAdminRoom(roomId, fullUpdateData)
    })

    const results = await Promise.all(promises)
    console.log('✅ 소그룹실 일괄 업데이트 완료:', results)
    return results
  } catch (err) {
    console.error('❌ 소그룹실 일괄 업데이트 실패:', err)
    throw err
  }
}

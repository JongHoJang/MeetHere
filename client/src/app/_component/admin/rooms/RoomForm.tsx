'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import toast from 'react-hot-toast'
import {
  createAdminRoom,
  updateAdminRoom,
  getRoomList,
  CreateRoomRequest,
  UpdateRoomRequest,
} from '@/lib/api/adminRoom'
import { AdminRoom } from '@/types/room'

// 통합된 폼 데이터 타입 정의
const roomFormSchema = z.object({
  name: z.string().min(1, '소그룹실 이름을 입력해주세요'),
  floor: z.string().min(1, '층을 선택해주세요'),
  personAffordableCount: z
    .number()
    .min(1, '최대 인원을 입력해주세요')
    .max(50, '50명 이하로 입력해주세요'),
  groupAffordableCount: z
    .number()
    .min(1, '신청 가능 팀 수를 입력해주세요')
    .max(10, '10팀 이하로 입력해주세요'),
  sittingType: z.enum(['CHAIR', 'FLOOR'], {
    message: '좌석 유형을 선택해주세요',
  }),
  availableStatus: z.enum(['AVAILABLE', 'UNAVAILABLE']).optional(),
  deleted: z.boolean().optional(),
  note: z.string().optional(),
})

type RoomFormData = z.infer<typeof roomFormSchema>

interface RoomFormProps {
  initialData?: AdminRoom
  roomId?: number
  mode: 'create' | 'edit'
}

export function RoomForm({ initialData, roomId, mode }: RoomFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()

  // 동적으로 층 목록 가져오기
  const { data: roomsData = [] } = useQuery({
    queryKey: ['admin', 'rooms', 'floors'],
    queryFn: () => getRoomList(),
  })

  // 층 목록 추출 (RoomListContainer와 동일한 로직)
  const floorOptions = useMemo(() => {
    const allRooms = roomsData.flatMap(floorData => floorData.rooms)
    return Array.from(new Set(allRooms.map(room => room.floor))).sort()
  }, [roomsData])

  // 모드에 따른 기본값 설정
  const getDefaultValues = (): RoomFormData => {
    if (mode === 'create') {
      return {
        name: '',
        floor: '',
        personAffordableCount: 8,
        groupAffordableCount: 2,
        sittingType: 'CHAIR',
        note: '',
      }
    } else {
      return {
        name: initialData?.name || '',
        floor: initialData?.floor || '',
        personAffordableCount: initialData?.personAffordableCount || 8,
        groupAffordableCount: initialData?.groupAffordableCount || 2,
        sittingType: initialData?.sittingType || 'CHAIR',
        availableStatus: initialData?.availableStatus || 'AVAILABLE',
        deleted: initialData?.deleted || false,
        note: initialData?.note || '',
      }
    }
  }

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RoomFormData>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: getDefaultValues(),
  })

  // 수정 모드일 때 초기 데이터 설정
  useEffect(() => {
    if (initialData && mode === 'edit') {
      console.log('폼에 설정할 초기 데이터:', initialData)
      reset({
        name: initialData.name || '',
        floor: initialData.floor || '',
        personAffordableCount: initialData.personAffordableCount || 8,
        groupAffordableCount: initialData.groupAffordableCount || 2,
        sittingType: initialData.sittingType || 'CHAIR',
        availableStatus: initialData.availableStatus || 'AVAILABLE',
        deleted: initialData.deleted || false,
        note: initialData.note || '',
      })
    }
  }, [initialData, mode, reset])

  // 상태 감시
  const isDeleted = mode === 'edit' ? watch('deleted') : false
  const availableStatus =
    mode === 'edit' ? watch('availableStatus') : 'AVAILABLE'

  const mutation = useMutation({
    mutationFn: (data: RoomFormData) => {
      if (mode === 'create') {
        const createData: CreateRoomRequest = {
          name: data.name,
          floor: data.floor,
          personAffordableCount: data.personAffordableCount,
          groupAffordableCount: data.groupAffordableCount,
          sittingType: data.sittingType,
          availableStatus: 'AVAILABLE',
          note: data.note || '',
        }
        return createAdminRoom(createData)
      } else if (mode === 'edit' && roomId) {
        // 🔥 삭제/복구 시 자동으로 상태 변경
        let finalAvailableStatus = data.availableStatus || 'AVAILABLE'

        if (data.deleted === true) {
          finalAvailableStatus = 'UNAVAILABLE' // 삭제 시 → 사용 불가
        } else if (data.deleted === false && initialData?.deleted === true) {
          finalAvailableStatus = 'AVAILABLE' // 복구 시 → 사용 가능
        }

        const updateData: UpdateRoomRequest = {
          name: data.name,
          floor: data.floor,
          personAffordableCount: data.personAffordableCount,
          groupAffordableCount: data.groupAffordableCount,
          sittingType: data.sittingType,
          availableStatus: finalAvailableStatus, // 🔥 자동 상태 변경
          deleted: data.deleted || false,
          note: data.note || '',
        }
        return updateAdminRoom(roomId, updateData)
      }
      return Promise.reject('잘못된 모드입니다')
    },
    onSuccess: responseData => {
      console.log('저장 성공:', responseData)
      queryClient.invalidateQueries({ queryKey: ['admin', 'rooms'] })
      if (mode === 'edit' && roomId) {
        queryClient.invalidateQueries({ queryKey: ['admin', 'room', roomId] })
      }
      toast.success(
        mode === 'create'
          ? '소그룹실이 추가되었습니다'
          : '소그룹실 정보가 수정되었습니다'
      )
      router.push('/dashboard/rooms')
    },
    onError: (error: any) => {
      console.error('저장 실패:', error)
      const errorMessage =
        error.response?.data?.message || '오류가 발생했습니다'
      toast.error(errorMessage)
    },
  })

  const onSubmit = (data: RoomFormData) => {
    console.log('제출할 데이터:', data)
    mutation.mutate(data)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === 'create' ? '소그룹실 추가' : '소그룹실 정보 수정'}
          </h2>
          {mode === 'edit' && initialData && (
            <div className="text-sm text-gray-500">
              ID: {initialData.roomId}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* 소그룹실 상태 토글 (수정 모드에서만) */}
          {mode === 'edit' && (
            <div className="bg-gray-50 rounded-lg p-4 border">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    소그룹실 상태
                  </h3>
                </div>
                <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setValue('availableStatus', 'AVAILABLE')}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      availableStatus === 'AVAILABLE'
                        ? 'bg-green-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    ✅ 사용 가능
                  </button>
                  <button
                    type="button"
                    onClick={() => setValue('availableStatus', 'UNAVAILABLE')}
                    className={`px-4 py-2 text-sm font-medium transition-colors border-l border-gray-300 ${
                      availableStatus === 'UNAVAILABLE'
                        ? 'bg-red-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    ❌ 사용 불가
                  </button>
                </div>
              </div>
              {availableStatus === 'UNAVAILABLE' && (
                <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-md">
                  <p className="text-sm text-orange-800">
                    ⚠️ 사용 불가 상태의 소그룹실은 예약할 수 없습니다.
                  </p>
                </div>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              소그룹실 이름 *
            </label>
            <input
              {...register('name')}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="소그룹실 이름을 입력하세요 (예: 201호)"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              층 *
            </label>
            <select
              {...register('floor')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">층을 선택하세요</option>
              {floorOptions.map(floor => (
                <option key={floor} value={floor}>
                  {floor}
                </option>
              ))}
            </select>
            {errors.floor && (
              <p className="mt-1 text-sm text-red-600">
                {errors.floor.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                최대 인원 *
              </label>
              <input
                {...register('personAffordableCount', { valueAsNumber: true })}
                type="number"
                min="1"
                max="50"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="최대 수용 인원"
              />
              {errors.personAffordableCount && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.personAffordableCount.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                신청 가능 팀 수 *
              </label>
              <input
                {...register('groupAffordableCount', { valueAsNumber: true })}
                type="number"
                min="1"
                max="10"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="신청 가능한 팀 수"
              />
              {errors.groupAffordableCount && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.groupAffordableCount.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              좌석 유형 *
            </label>
            <select
              {...register('sittingType')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">좌석 유형을 선택하세요</option>
              <option value="CHAIR">의자석</option>
              <option value="FLOOR">좌식</option>
            </select>
            {errors.sittingType && (
              <p className="mt-1 text-sm text-red-600">
                {errors.sittingType.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              비고
            </label>
            <textarea
              {...register('note')}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="소그룹실에 대한 추가 설명을 입력하세요"
            />
          </div>

          {/* 위험 구역 (수정 모드에서 삭제되지 않은 경우만) */}
          {mode === 'edit' && !isDeleted && (
            <div className="border-t border-gray-200 pt-6">
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="text-red-600 text-xl">⚠️</span>
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-medium text-red-800">
                      위험 구역
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>소그룹실을 삭제하면 다음과 같은 영향이 있습니다:</p>
                      <ul className="mt-1 list-disc list-inside space-y-1">
                        <li>예약 시스템에서 완전히 제거됩니다</li>
                        <li>
                          기존 예약 데이터는 유지되지만 새로운 예약은
                          불가능합니다
                        </li>
                        <li>삭제 후에는 복구하기 어렵습니다</li>
                      </ul>
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={() => {
                          if (
                            confirm(
                              '정말로 이 소그룹실을 삭제하시겠습니까?\n\n삭제하면 예약 시스템에서 완전히 제거되며, 복구하기 어렵습니다.'
                            )
                          ) {
                            setValue('deleted', true)
                            setValue('availableStatus', 'UNAVAILABLE')
                            toast(
                              '삭제 상태로 변경되었습니다. 저장 버튼을 눌러주세요.',
                              {
                                icon: '🗑️',
                                duration: 4000,
                              }
                            )
                          }
                        }}
                        className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      >
                        🗑️ 소그룹실 삭제하기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 삭제된 상태일 때 표시 */}
          {mode === 'edit' && isDeleted && (
            <div className="border-t border-gray-200 pt-6">
              <div className="bg-red-100 rounded-lg p-4 border border-red-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-red-600 text-xl mr-3">🗑️</span>
                    <div>
                      <h3 className="text-sm font-medium text-red-800">
                        삭제된 소그룹실
                      </h3>
                      <p className="text-sm text-red-700">
                        이 소그룹실은 삭제 상태입니다. 예약 시스템에서 사용할 수
                        없습니다.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('이 소그룹실을 복구하시겠습니까?')) {
                        setValue('deleted', false)
                        setValue('availableStatus', 'AVAILABLE')
                        toast(
                          '복구 상태로 변경되었습니다. 저장 버튼을 눌러주세요.',
                          {
                            icon: '🔄',
                            duration: 4000,
                          }
                        )
                      }
                    }}
                    className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700"
                  >
                    복구하기
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md disabled:opacity-50 ${
                mode === 'edit' && isDeleted
                  ? 'bg-orange-600 hover:bg-orange-700'
                  : mode === 'edit' && availableStatus === 'UNAVAILABLE'
                    ? 'bg-yellow-600 hover:bg-yellow-700'
                    : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting
                ? mode === 'create'
                  ? '추가 중...'
                  : '저장 중...'
                : mode === 'create'
                  ? '추가'
                  : isDeleted
                    ? '삭제 상태 저장'
                    : '수정완료'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

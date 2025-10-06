'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { updateAdminUser, createAdminUser } from '@/lib/api/admin'
import { Leader } from '@/types/admin'

// 통합된 폼 데이터 타입 정의
const leaderFormSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  birthday: z.string().min(1, '생일을 입력해주세요'),
  churchMemberId: z.number().min(0, '교회 회원 ID를 입력해주세요'),
  community: z.string().min(1, '공동체를 선택해주세요'),
  deleted: z.boolean().optional(), // optional로 설정
})

type LeaderFormData = z.infer<typeof leaderFormSchema>

// API 요청용 타입들
type CreateUserRequest = {
  name: string
  birthday: string
  churchMemberId: number
  community: string
}

type UpdateUserRequest = {
  name: string
  birthday: string
  churchMemberId: number
  community: string
  deleted: boolean
}

interface LeaderFormProps {
  initialData?: Leader
  userId?: number
  mode: 'create' | 'edit'
}

export function LeaderForm({ initialData, userId, mode }: LeaderFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()

  // 모드에 따른 기본값 설정
  const getDefaultValues = (): LeaderFormData => {
    if (mode === 'create') {
      return {
        name: '',
        birthday: '',
        churchMemberId: 0,
        community: '',
        // deleted는 생성 모드에서 제외
      }
    } else {
      return {
        name: initialData?.name || '',
        birthday: initialData?.birthday || '',
        churchMemberId: initialData?.churchMemberId || 0,
        community: initialData?.community || '',
        deleted: initialData?.deleted || false,
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
  } = useForm<LeaderFormData>({
    resolver: zodResolver(leaderFormSchema),
    defaultValues: getDefaultValues(),
  })

  // 수정 모드일 때 초기 데이터 설정
  useEffect(() => {
    if (initialData && mode === 'edit') {
      console.log('폼에 설정할 초기 데이터:', initialData)

      reset({
        name: initialData.name || '',
        birthday: initialData.birthday || '',
        churchMemberId: initialData.churchMemberId || 0,
        community: initialData.community || '',
        deleted: initialData.deleted || false,
      })
    }
  }, [initialData, mode, reset])

  // deleted 상태 감시 (수정 모드에서만)
  const isDeleted = mode === 'edit' ? watch('deleted') : false

  const mutation = useMutation({
    mutationFn: (data: LeaderFormData) => {
      if (mode === 'create') {
        // 생성 시에는 deleted 필드 제외
        const createData: CreateUserRequest = {
          name: data.name,
          birthday: data.birthday,
          churchMemberId: data.churchMemberId,
          community: data.community,
        }
        return createAdminUser(createData)
      } else if (mode === 'edit' && userId) {
        // 수정 시에는 deleted 필드 포함
        const updateData: UpdateUserRequest = {
          name: data.name,
          birthday: data.birthday,
          churchMemberId: data.churchMemberId,
          community: data.community,
          deleted: data.deleted || false,
        }
        return updateAdminUser(userId, updateData)
      }
      return Promise.reject('잘못된 모드입니다')
    },
    onSuccess: responseData => {
      console.log('저장 성공:', responseData)
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] })
      if (mode === 'edit' && userId) {
        queryClient.invalidateQueries({ queryKey: ['admin', 'user', userId] })
      }
      toast.success(
        mode === 'create'
          ? '사용자가 추가되었습니다'
          : '사용자 정보가 수정되었습니다'
      )
      router.push('/dashboard/leaders')
    },
    onError: (error: any) => {
      console.error('저장 실패:', error)
      const errorMessage =
        error.response?.data?.message || '오류가 발생했습니다'
      toast.error(errorMessage)
    },
  })

  const onSubmit = (data: LeaderFormData) => {
    console.log('제출할 데이터:', data)
    mutation.mutate(data)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === 'create' ? '사용자 추가' : '사용자 정보 수정'}
          </h2>
          {mode === 'edit' && initialData && (
            <div className="text-sm text-gray-500">
              ID: {initialData.userId} | 이메일: {initialData.email}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* 삭제 상태 토글 (수정 모드에서만 표시) */}
          {mode === 'edit' && (
            <div className="bg-gray-50 rounded-lg p-4 border">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    사용자 상태
                  </h3>
                  {isDeleted === false ? (
                    <p className="text-sm font-medium text-gray-500">
                      현재 리더로 섬기고 있는 청년입니다.
                    </p>
                  ) : (
                    <p className="text-sm font-medium text-red-800">
                      현재 리더를 쉬고 있는 청년입니다.
                    </p>
                  )}
                </div>

                {/* 🎨 간단한 버튼 그룹 */}
                <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setValue('deleted', false)}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      !isDeleted
                        ? 'bg-green-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    ✅ 활성
                  </button>
                  <button
                    type="button"
                    onClick={() => setValue('deleted', true)}
                    className={`px-4 py-2 text-sm font-medium transition-colors border-l border-gray-300 ${
                      isDeleted
                        ? 'bg-red-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    🗑️ 제외
                  </button>
                </div>
              </div>

              {isDeleted && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-800">
                    ⚠️ 제외된 리더는 시스템에 로그인할 수 없으며, 모든 서비스
                    이용이 제한됩니다.
                  </p>
                </div>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이름 *
            </label>
            <input
              {...register('name')}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="사용자 이름을 입력하세요"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              생일 *
            </label>
            <input
              {...register('birthday')}
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.birthday && (
              <p className="mt-1 text-sm text-red-600">
                {errors.birthday.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              교번 *
            </label>
            <input
              {...register('churchMemberId', { valueAsNumber: true })}
              type="number"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="교번을 입력하세요"
            />
            {errors.churchMemberId && (
              <p className="mt-1 text-sm text-red-600">
                {errors.churchMemberId.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              공동체 *
            </label>
            <select
              {...register('community')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">공동체를 선택하세요</option>
              <option value="JOSEPH">요셉</option>
              <option value="DAVID">다윗</option>
              <option value="ESTHER">에스더</option>
              <option value="JOSHUA">여호수아</option>
              <option value="DANIEL">다니엘</option>
              <option value="PRISCILLA">쁘아</option>
              <option value="MOSES">모세</option>
              {/* 필요시 다른 공동체 옵션들 추가 */}
            </select>
            {errors.community && (
              <p className="mt-1 text-sm text-red-600">
                {errors.community.message}
              </p>
            )}
          </div>

          {/* 생성 모드일 때 안내 메시지 */}
          {/*{mode === 'create' && (*/}
          {/*  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">*/}
          {/*    <h4 className="text-sm font-medium text-blue-900 mb-2">*/}
          {/*      생성 안내*/}
          {/*    </h4>*/}
          {/*    <ul className="text-xs text-blue-800 space-y-1">*/}
          {/*      <li>*/}
          {/*        • 사용자가 생성되면 시스템에서 자동으로 사용자 ID가*/}
          {/*        부여됩니다.*/}
          {/*      </li>*/}
          {/*      <li>• 이메일과 역할은 시스템에서 자동으로 설정됩니다.</li>*/}
          {/*      <li>• 생성된 사용자는 기본적으로 활성 상태가 됩니다.</li>*/}
          {/*    </ul>*/}
          {/*  </div>*/}
          {/*)}*/}

          {/* 읽기 전용 정보 표시 (수정 모드) */}
          {/*{mode === 'edit' && initialData && (*/}
          {/*  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">*/}
          {/*    <h4 className="text-sm font-medium text-blue-900 mb-2">*/}
          {/*      읽기 전용 정보*/}
          {/*    </h4>*/}
          {/*    <div className="grid grid-cols-2 gap-4 text-xs text-blue-800">*/}
          {/*      <div>*/}
          {/*        <span className="font-medium">이메일:</span>{' '}*/}
          {/*        {initialData.email}*/}
          {/*      </div>*/}
          {/*      <div>*/}
          {/*        <span className="font-medium">역할:</span>{' '}*/}
          {/*        {initialData.userRole === 'ADMIN' ? '관리자' : '사용자'}*/}
          {/*      </div>*/}
          {/*      <div>*/}
          {/*        <span className="font-medium">가입 상태:</span>{' '}*/}
          {/*        {initialData.isSignedUp ? '가입완료' : '미가입'}*/}
          {/*      </div>*/}
          {/*      <div>*/}
          {/*        <span className="font-medium">사용자 ID:</span>{' '}*/}
          {/*        {initialData.userId}*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*)}*/}

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
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting
                ? mode === 'create'
                  ? '추가 중...'
                  : '저장 중...'
                : mode === 'create'
                  ? '추가'
                  : '수정완료'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

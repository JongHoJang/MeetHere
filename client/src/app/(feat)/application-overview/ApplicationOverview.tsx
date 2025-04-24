'use client'

import React from 'react'
import { fetchRoomInfoClient } from '@/lib/api/roomController'
import { useUserStore } from '@/store/useUserStore'
import SubmitButton from '@/app/_component/button/SubmitButton'
import { useRouter } from 'next/navigation'
import RoomListContainer from '@/app/(feat)/_component/RoomListContainer'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '@/app/_component/LoadingSpinner'

const ApplicationOverview = () => {
  const { userInfo } = useUserStore()
  const router = useRouter()

  const {
    data: rooms,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['rooms'],
    queryFn: fetchRoomInfoClient,
    staleTime: 1000 * 60 * 5,
    enabled: !!userInfo,
  })

  if (isLoading) return <LoadingSpinner />
  if (error)
    return (
      <div className="p-4 text-center text-red-500">
        신청 현황 불러오는 도중 오류가 발생했습니다.
      </div>
    )

  return (
    <div className="pt-10 sm:pb-20">
      <div className="mx-auto max-w-web-main">
        <div className="px-4 md:px-0">
          <div>
            <div className="flex flex-row text-xl md:text-2xl mb-4">
              <h1>소소그룹실 지원 현황입니다 👋</h1>
            </div>

            {/*박스*/}
            <div>
              <div className=" w-full bg-[#f5f5f5] px-4 py-6 md:p-10 rounded-[4px]">
                <div className="flex justify-center items-center font-semibold text-[18px] mb-6">
                  소그룹실 지원 현황
                </div>

                <div className="w-full bg-white p-5 rounded-[4px] mb-[10px]">
                  <RoomListContainer rooms={rooms} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 mb-10 w-full max-w-[380px] mx-auto px-4 sm:px-0">
        <SubmitButton
          onClick={() => router.push('main')}
          buttonLabel={'돌아가기'}
        />
      </div>
    </div>
  )
}

export default ApplicationOverview

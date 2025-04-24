'use client'

import React from 'react'
import { usingRoomUserList } from '@/lib/api/roomController'
import SignUpButton from '@/app/_component/button/SignUpButton'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/store/useUserStore'
import LoadingSpinner from '@/app/_component/LoadingSpinner'
import { useQuery } from '@tanstack/react-query'

type MatchingData = {
  roomName: string | null
  winners: {
    userName: string | null
    useDate: string | null
  }[]
}

const CheckWinnerClient = () => {
  const router = useRouter()
  const { userInfo } = useUserStore()
  const userName = userInfo?.userName

  const {
    data: matchingList,
    isLoading,
    error,
  } = useQuery<MatchingData[]>({
    queryKey: ['matchingList'],
    queryFn: usingRoomUserList,
    staleTime: 1000 * 60 * 5,
  })

  if (isLoading) return <LoadingSpinner />
  if (error)
    return (
      <div className="p-4 text-center text-red-500">
        당첨자를 불러오는 도중 오류가 발생했습니다.
      </div>
    )

  return (
    <div className="pt-10 pb-20">
      <div className="mx-auto max-w-web-main">
        <div className="px-4 md:px-0">
          {/* 타이틀 */}
          <div className="flex flex-row text-xl md:text-2xl mb-4">
            <h1>소그룹실 배정을 축하합니다~!! 🎉</h1>
          </div>

          {/* 당첨 박스 */}
          <div>
            <div className=" w-full bg-[#f5f5f5] px-4 py-6 md:p-10 rounded-[4px] mb-[10px]">
              <div className="flex justify-center items-center font-semibold text-[18px] mb-6">
                당첨자 확인
              </div>

              <div className="w-full bg-white p-5 rounded-[4px] mb-[10px]">
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  {matchingList?.map((room, idx) => {
                    const isUserWinner = room.winners.some(
                      winner => winner.userName === userName
                    )

                    return (
                      <div
                        key={idx}
                        className={`flex flex-col h-full text-[14px] font-semibold rounded-[4px] shadow border ${
                          isUserWinner ? 'bg-blue-200 font-bold' : 'bg-white'
                        }`}
                      >
                        <div className="font-bold text-center text-white mb-1 bg-gray-500 py-1 rounded-t">
                          {room.roomName}
                        </div>
                        <ul className="text-sm text-center text-gray-600 space-y-1 py-2">
                          {room.winners.length > 0 ? (
                            room.winners.map((w, i) => (
                              <li key={i}>{w.userName}</li>
                            ))
                          ) : (
                            <li className="text-gray-400 italic">
                              신청자 없음
                            </li>
                          )}
                        </ul>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 mb-10 w-full max-w-[380px] mx-auto px-4 sm:px-0">
            <SignUpButton
              buttonLabel={'돌아가기'}
              onClick={() => router.push('/main')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckWinnerClient

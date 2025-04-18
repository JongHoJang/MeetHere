'use client'

import React, { useEffect, useState } from 'react'
import { usingRoomUserList } from '@/lib/api/roomController'
import SignUpButton from '@/app/_component/button/SignUpButton'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/store/useUserStore'

type MatchingData = {
  roomName: string | null
  winners: {
    userName: string | null
    useDate: string | null
  }[]
}

const CheckWinnerClient = () => {
  const router = useRouter()
  const [matchingList, setMatchingList] = useState<MatchingData[] | null>(null)
  const { userInfo } = useUserStore()
  const userName = userInfo?.userName

  useEffect(() => {
    const fetchMatchingRoom = async () => {
      try {
        const data = await usingRoomUserList()
        setMatchingList(data)
      } catch (err) {
        console.error('방 목록 불러오기 실패', err)
      }
    }

    fetchMatchingRoom()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center mb-24 w-full">
      <div className="w-full max-w-web-main p-4">
        <div className="flex items-center justify-center">
          <div>
            <div className="flex flex-row text-[30px] mb-[26px]">
              <h1>소그룹실 배정을 축하합니다~!! 🎉</h1>
            </div>

            <div>
              <div className=" w-full bg-[#f5f5f5] p-10 rounded-[4px] mb-[10px]">
                <div className="flex justify-center items-center font-semibold text-[18px] mb-6">
                  당첨자 확인
                </div>

                <div className="w-full bg-white p-5 rounded-[4px] mb-[10px]">
                  <div className="flex flex-wrap gap-4 justify-between">
                    {matchingList?.map((room, idx) => {
                      const isUserWinner = room.winners.some(
                        winner => winner.userName === userName
                      )

                      return (
                        <div
                          key={idx}
                          className={`rounded min-h-[80px] w-[140px] shadow border ${
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
            <div className="flex justify-center items-center my-10">
              <SignUpButton
                buttonLabel={'돌아가기'}
                onClick={() => router.push('/main')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckWinnerClient

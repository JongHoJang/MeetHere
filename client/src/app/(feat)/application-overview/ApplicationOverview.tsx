'use client'

import React, { useEffect, useState } from 'react'
import GuideText from '@/app/(feat)/_component/GuideText'
import { fetchRoomInfoClient } from '@/lib/api/roomController'
import RoomListContainer from '@/app/(feat)/application-overview/_component/RoomListContainer'
import { useUserStore } from '@/store/useUserStore'
import SubmitButton from '@/app/_component/button/SubmitButton'
import { useRouter } from 'next/navigation'

const ApplicationOverview = () => {
  const { userInfo } = useUserStore()
  const router = useRouter()

  const [rooms, setRooms] = useState([])

  useEffect(() => {
    const fetchRoomInfo = async () => {
      try {
        if (userInfo) {
          const data = await fetchRoomInfoClient()
          setRooms(data)
        }
      } catch (err) {
        console.error('방 목록 불러오기 실패', err)
      }
    }

    fetchRoomInfo()
  }, [userInfo])
  console.log(rooms)

  return (
    <div className="flex flex-col items-center justify-center mb-24 w-full">
      <div className="w-web-main p-4">
        <div className="flex items-center justify-center">
          <div>
            <div className="flex flex-row text-[30px] mb-[26px]">
              <h1>소그룹실 지원 현황입니다. 👋</h1>
            </div>

            {/*박스*/}
            <div>
              <div className=" w-full bg-[#f5f5f5] p-10 rounded-[4px] mb-[10px]">
                <div className="flex justify-center items-center font-semibold text-[18px] mb-6">
                  소그룹실 지원 현황
                </div>
                <div className="w-full bg-white p-5 rounded-[4px] mb-[10px]">
                  <RoomListContainer rooms={rooms} />
                </div>
              </div>
              {/* 박스 외부*/}
              <GuideText />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 mb-10">
        <SubmitButton
          onClick={() => router.push('main')}
          buttonLabel={'돌아가기'}
        />
      </div>
    </div>
  )
}

export default ApplicationOverview

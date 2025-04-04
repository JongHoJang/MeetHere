'use client'

import React from 'react'
import RedirectButton from '@/app/_component/RedirectButton'
import GuideText from '@/app/(feat)/_component/GuideText'
import { useAuthStore } from '@/app/store/useAuthStore'

const DashboardPage = () => {
  // const user = useAuthStore(state => state.userId)
  const userInfo = useAuthStore(state => state.userInfo)

  return (
    <div className="flex flex-col items-center justify-center mb-24 w-full">
      <div className="w-[1200px]">
        <div className="flex items-center justify-center">
          <div className="w-[800px]">
            <div className="flex flex-row text-[30px] mb-[26px]">
              <h1 className="font-semibold flex items-center">
                {userInfo ? (
                  <span className="w-[100px]">{userInfo.userName}</span>
                ) : (
                  <div className="w-[100px] h-8  animate-pulse rounded-md" />
                )}
              </h1>
              <h1>
                <span className="font-semibold">리더님,</span> 환영합니다 👋
              </h1>
            </div>

            {/*박스 내부*/}
            <div>
              <div className=" w-full bg-[#f5f5f5] p-10 rounded-[4px] mb-[10px]">
                <div className="flex flex-row gap-20 mb-[30px]">
                  <div>
                    <div className="font-bold text-[14px]">신청 마감</div>
                    {userInfo?.applicationDeadline.split('T')[0]}
                    <br />
                    {userInfo?.applicationDeadline.split('T')[1]}
                  </div>
                  <div>
                    <div className="font-bold text-[14px]">발표 일시</div>
                    {userInfo?.announcementTime.split('T')[0]}
                    <br />
                    {userInfo?.announcementTime.split('T')[1]}
                  </div>
                  <div>
                    <div className="font-bold text-[14px]">사용일</div>
                    <div>{userInfo?.useDate}</div>
                    <div>나무모임 시간</div>
                  </div>
                </div>
                <hr className="border-t border-gray-300  mb-[30px]" />
                <div>
                  <div className="font-bold text-[14px]">신청 내역</div>
                  <div>{userInfo?.status}</div>
                </div>
              </div>
              <GuideText />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <RedirectButton
          buttonLabel={'신청하러 가기'}
          movePage={'/selectRoom'}
        />
      </div>
    </div>
  )
}

export default DashboardPage

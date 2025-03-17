'use client'

import React from 'react'
import RedirectButton from '@/app/_component/RedirectButton'
import GuideText from '@/app/(feat)/_component/GuideText'

const DashboardPage = () => {
  const userName = '장종호'
  const applicationDeadline = '02월 24일 (월)'
  const applicationDeadlineTime = '20:30'
  const announcementDate = '02월 24일 (월)'
  const announcementTime = '21:00'
  const usageDate = '03월 02일 (주일)'

  return (
    <div className="flex flex-col items-center justify-center mb-24 w-full">
      <div className="w-[1200px]">
        <div className="flex items-center justify-center">
          <div className="w-[800px]">
            <div className="flex flex-row text-[30px] mb-[26px]">
              <h2 className="font-bold">{userName} 리더님,</h2> 안녕하세요
            </div>

            {/*박스 내부*/}
            <div>
              <div className=" w-full bg-[#f5f5f5] p-10 rounded-[4px] mb-[10px]">
                <div className="flex flex-row gap-20 mb-[30px]">
                  <div>
                    <div className="font-bold text-[14px]">신청 마감</div>
                    {/*<div className="bg-red-300 p-3 rounded-[4px]">*/}
                    <div>{applicationDeadline}</div>
                    <div>{applicationDeadlineTime}</div>
                    {/*</div>*/}
                  </div>
                  <div>
                    <div className="font-bold text-[14px]">발표 일시</div>
                    {/*<div className="bg-red-300 p-3 rounded-[4px]">*/}
                    <div>{announcementDate}</div>
                    <div>{announcementTime}</div>
                    {/*</div>*/}
                  </div>
                  <div>
                    <div className="font-bold text-[14px]">사용일</div>
                    {/*<div className="bg-red-300 p-3 rounded-[4px]">*/}
                    <div>{usageDate}</div>
                    <div>나무모임 시간</div>
                    {/*</div>*/}
                  </div>
                </div>
                <hr className="border-t border-gray-300  mb-[30px]" />
                <div>
                  <div className="font-bold text-[14px]">신청 마감</div>
                  <div>
                    아직 소그룹실을 신청하지 않으셨네요! <br />
                    원하는 소그룹실을 선택해주세요.
                  </div>
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

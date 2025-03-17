'use client'

import React from 'react'
import GuideText from '@/app/(feat)/_component/GuideText'
import SelectRoomContainer from '@/app/(feat)/selectRoom/_component/SelectRoomContainer'
import Button from '@/app/_component/Button'

const SelectRoomPage = () => {
  const userName = '장종호'

  return (
    <div className="flex flex-col items-center justify-center mb-24 w-full">
      <div className="w-[1200px]">
        <div className="flex items-center justify-center">
          <div className="w-[800px]">
            <div className="flex flex-row text-[30px] mb-[26px]">
              <h2 className="font-bold">{userName} 리더님,</h2>&nbsp; 소그룹실을 신청해주세요
            </div>

            {/*박스*/}
            <div>
              {/*박스 내부*/}
              <div className=" w-full bg-[#f5f5f5] p-10 rounded-[4px] mb-[10px]">
                <div className="flex justify-center items-center font-semibold text-[18px] mb-6">
                  소그룹실 선택
                </div>
                <div className="w-full bg-white p-5 rounded-[4px] mb-[10px]">
                  <SelectRoomContainer />
                </div>
              </div>
              {/* 박스 외부*/}
              <GuideText />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Button buttonLabel={'신청하기'} movePage={'/dashboard'} />
      </div>
    </div>
  )
}

export default SelectRoomPage

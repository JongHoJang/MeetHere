'use client'

import React, { useEffect, useState } from 'react'
import GuideText from '@/app/(feat)/_component/GuideText'
import RoomListContainer from '@/app/(feat)/selectRoom/_component/RoomListContainer'
import Button from '@/app/_component/Button'
import Modal from '@/app/_component/ModalPage'
import { useRouter } from 'next/navigation'
import SuccessModalContent from '@/app/_component/SuccessModalContent'
import { useAuthStore } from '@/app/store/useAuthStore'
import { Room } from '@/types/room'
import { fetchRoomInfo } from '@/lib/api/roomController'

const SelectRoomPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [roomList, setRoomList] = useState<Room[]>([])
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)

  const userId = useAuthStore(state => state.userId)

  const userInfo = useAuthStore(state => state.userInfo)

  // const router = useRouter()
  useEffect(() => {
    const loadRooms = async () => {
      if (!userId) return

      try {
        const data = await fetchRoomInfo(userId)
        // console.log(userId)

        setRoomList(data)
      } catch (e) {
        console.error('방 목록 불러오기 실패', e)
      }
    }

    loadRooms()
  }, [userId])

  // 신청하기 버튼 함수
  // const handleApply = () => {
  //   // TODO: 신청 API 호출 등
  //   setIsModalOpen(true)
  // }
  console.log(selectedRoom)

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
                <span className="font-semibold">리더님,</span> 소그룹실을
                신청해주세요 👋
              </h1>
            </div>

            {/*박스*/}
            <div>
              <div className=" w-full bg-[#f5f5f5] p-10 rounded-[4px] mb-[10px]">
                <div className="flex justify-center items-center font-semibold text-[18px] mb-6">
                  소그룹실 선택
                </div>
                <div className="w-full bg-white p-5 rounded-[4px] mb-[10px]">
                  <RoomListContainer
                    rooms={roomList}
                    setSelectedRoom={setSelectedRoom}
                  />
                </div>
              </div>
              {/* 박스 외부*/}
              <GuideText />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Button buttonLabel={'신청하기'} />
      </div>

      {/* 모달 */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <SuccessModalContent
          movePage={'/dashboard'}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  )
}

export default SelectRoomPage

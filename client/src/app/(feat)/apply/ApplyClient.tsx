'use client'

import React, { useEffect, useState } from 'react'
import GuideText from '@/app/(feat)/_component/GuideText'
import { fetchRoomInfoClient } from '@/lib/api/roomController'
import { Room } from '@/types/room'
import Modal from '@/app/_component/modal/ModalPage'
import SuccessModalContent from '@/app/_component/modal/SuccessModalContent'
import { useUserStore } from '@/store/useUserStore'
import BeforeReserveModalContent from '@/app/_component/modal/BeforeReserveModalContent'
import { FailModalContent } from '@/app/_component/modal/FailModalContent'
import RoomListContainer from '@/app/(feat)/_component/RoomListContainer'
import ApplyButton from '@/app/_component/button/ApplyButton'

const Apply = () => {
  const { userInfo } = useUserStore()

  const [rooms, setRooms] = useState([])
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [isNormalModalOpen, setIsNormalModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [isFailModalOpen, setIsFailModalOpen] = useState(false)

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
    <div className="pt-10 pb-10">
      <div className="mx-auto max-w-web-main">
        <div className="px-4 md:px-0">
          {/* 타이틀 */}
          <div className="flex flex-row text-xl md:text-2xl mb-4 whitespace-nowrap">
            <h1 className="font-semibold flex items-center">
              <span className="">{userInfo?.userName}</span>
              <span className="font-semibold">&nbsp;리더님,</span>
            </h1>
            <h1>
              <span>&nbsp;소그룹실을 신청해주세요 👋 </span>
            </h1>
          </div>

          {/*박스*/}
          <div>
            <div className=" w-full bg-[#f5f5f5] px-4 py-6 md:p-10 rounded-[4px] mb-[10px]">
              <div className="flex justify-center items-center font-semibold text-[18px] mb-6">
                소그룹실 선택
              </div>
              <div className="w-full bg-white p-5 rounded-[4px] mb-[10px]">
                <RoomListContainer
                  rooms={rooms}
                  setSelectedRoom={setSelectedRoom}
                  selectedRoom={selectedRoom}
                  clickable
                />
              </div>
            </div>
            {/* 박스 외부*/}
            <GuideText />
          </div>
        </div>
      </div>
      <div className="mt-12 mb-10 w-full max-w-[380px] mx-auto px-4 sm:px-0">
        <ApplyButton
          onClick={() => setIsNormalModalOpen(true)}
          disabled={!selectedRoom}
          buttonLabel={'신청하기'}
        />
      </div>

      {/*모달*/}
      <Modal
        open={isNormalModalOpen}
        onClose={() => setIsNormalModalOpen(false)}
      >
        <BeforeReserveModalContent
          modalTitle={`🏠 ${selectedRoom?.name}을 예약하시겠어요?`}
          modalDescription="예약 후에는 변경이 어렵습니다."
          roomId={selectedRoom?.roomId}
          roomName={selectedRoom?.name}
          onClose={() => setIsNormalModalOpen(false)}
          onSuccess={() => {
            setIsNormalModalOpen(false)
            setIsSuccessModalOpen(true)
          }}
          onFail={() => {
            setIsNormalModalOpen(false)
            setIsFailModalOpen(true)
          }}
        />
      </Modal>

      {/* 성공 모달 */}
      <Modal
        open={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      >
        <SuccessModalContent
          onClose={() => setIsSuccessModalOpen(false)}
          roomName={selectedRoom?.name}
        />
      </Modal>

      {/* 실패 모달 */}
      <Modal open={isFailModalOpen} onClose={() => setIsFailModalOpen(false)}>
        <FailModalContent onClose={() => setIsFailModalOpen(false)} />
      </Modal>
    </div>
  )
}

export default Apply

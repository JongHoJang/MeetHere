'use client'

import React, { useEffect, useState } from 'react'
import GuideText from '@/app/(feat)/_component/GuideText'
import { fetchRoomInfoClient } from '@/lib/api/roomController'
import RoomListContainer from '@/app/(feat)/apply/_component/RoomListContainer'
import { Room } from '@/types/room'
import Modal from '@/app/_component/modal/ModalPage'
import SuccessModalContent from '@/app/_component/modal/SuccessModalContent'
import { useUserStore } from '@/store/useUserStore'
import BeforeReserveModalContent from '@/app/_component/modal/BeforeReserveModalContent'
import { FailModalContent } from '@/app/_component/modal/FailModalContent'
import SubmitButton from '@/app/_component/button/SubmitButton'

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
)

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
  // console.log(selectedRoom)

  return (
    <div className="flex flex-col items-center justify-center mb-24 w-full">
      <div className="w-web-main p-4">
        <div className="flex items-center justify-center">
          <div>
            <div className="flex flex-row text-[30px] mb-[26px]">
              <h1 className="font-semibold flex items-center">
                {userInfo ? (
                  <span className="w-[100px]">{userInfo.userName}</span>
                ) : (
                  // <div className="w-[100px] h-8  animate-pulse rounded-md" />
                  <Skeleton className="w-[120px] h-8" />
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
                    rooms={rooms}
                    setSelectedRoom={setSelectedRoom}
                    selectedRoom={selectedRoom}
                  />
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

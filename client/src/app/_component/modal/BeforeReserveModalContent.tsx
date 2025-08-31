'use client'

import React, { useState } from 'react'
import ReserveButton from '@/app/_component/button/ReserveButton'

interface Props {
  modalTitle: string
  modalDescription: string
  onCloseAction: () => void
  onSuccessAction: () => void
  onFailAction: () => void
  roomId?: number | null
  roomName?: string | null
}

export default function BeforeReserveModalContent({
  modalTitle,
  modalDescription,
  onCloseAction,
  onSuccessAction,
  onFailAction,
  roomId,
  roomName,
}: Props) {
  const [needExtraRoom, setNeedExtraRoom] = useState(false)

  const handleClose = () => {
    onCloseAction()
  }

  return (
    <>
      <div className="text-center">
        <h2 className="text-xl font-bold">{modalTitle}</h2>
        <p className="mb-4">{modalDescription}</p>

        {/*체크박스*/}
        <div className="flex justify-center mb-4 ">
          <input
            type="checkbox"
            id="needExtraRoom"
            checked={needExtraRoom}
            onChange={e => setNeedExtraRoom(e.target.checked)}
            className="w-5 h-5 "
          />
          <div className="text-sm">
            <label htmlFor="needExtraRoom" className="text-sm ml-1">
              미당첨 시, 남은 소그룹실에 추가 배정해주세요{' '}
            </label>
            <div>(가든파구스 제외)</div>
          </div>
        </div>

        {/* 버튼 컨테이너 */}
        {/* 신청하기 버튼 */}
        <div className="w-full max-w-[300px] mx-auto">
          <ReserveButton
            buttonLabel="신청하기"
            roomId={roomId}
            roomName={roomName}
            needExtraRoom={needExtraRoom}
            onClick={onCloseAction}
            onSuccess={onSuccessAction}
            onFail={onFailAction}
          />
        </div>

        {/* 다시 선택하기 버튼 */}
        <button
          type="button"
          className="w-[320px] text-md font-bold underline text-gray-600 hover:text-black transition"
          onClick={handleClose}
        >
          다시 선택하기
        </button>
      </div>
    </>
  )
}

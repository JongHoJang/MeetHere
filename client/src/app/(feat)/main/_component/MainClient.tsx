'use client'

import React from 'react'
import GuideText from '@/app/(feat)/_component/GuideText'
import { useUserStore } from '@/store/useUserStore'
import { useRouter } from 'next/navigation'
import LoadingSpinner from '@/app/_component/LoadingSpinner'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import { RefreshCw } from 'lucide-react'

// 상태에 따른 메시지 분기처리
const getStatusMessage = (
  status: string | undefined,
  roomName: string | undefined,
  allocatedRoomName?: string | undefined
) => {
  switch (status) {
    case 'NOT_APPLIED':
      return (
        <>
          신청 기간이 종료되었습니다. <br className="block sm:hidden" />
          다음 주엔 꼭 신청해 주세요! 😄
        </>
      )
    case 'BEFORE_APPLICATION':
      return (
        <>
          아직 신청하지 않으셨네요! <br className="block sm:hidden" />
          지금 바로 신청해 보세요!
        </>
      )
    case 'AFTER_APPLICATION':
      return (
        <>
          <span className="font-bold text-main-d-black">{roomName}</span>
          실로 신청이 완료되었습니다. <br className="block sm:hidden" />
          발표일을 기다려 주세요!
        </>
      )
    case 'WINNER': {
      const isSameRoom = roomName === allocatedRoomName
      return isSameRoom ? (
        <>
          🎉 축하드립니다! {''}
          <span className="font-bold text-red-500">{roomName}</span> 에
          당첨되셨어요. <br className="block sm:hidden" />
          사용 일정을 확인해 주세요.
        </>
      ) : (
        <>
          🎉 축하드립니다! <br className="block sm:hidden" />
          신청하신{' '}
          <span className="font-bold text-main-d-black">{roomName}</span>에는
          아쉽게 탈락했지만, {''}
          <br className="block sm:hidden" />
          <span className="font-bold text-red-500">{allocatedRoomName}</span> 에
          추가 배정되셨어요!
        </>
      )
    }
    case 'LOSER':
      return (
        <>
          아쉽게도 이번에는{' '}
          <span className="font-bold text-red-500">{roomName}</span> 소그룹실에
          당첨되지 않았습니다. <br className="block sm:hidden" />
          다음 기회를 노려보세요! 💪
        </>
      )
    default:
      return '신청 상태를 불러오는 중입니다...'
  }
}

// 상태에 따른 버튼 분기 처리
const getButtonProps = (status: string | undefined) => {
  switch (status) {
    case 'BEFORE_APPLICATION':
      return {
        label: '신청하러 가기',
        title: '신청 내역',
        path: '/apply',
        disabled: false,
      }
    case 'AFTER_APPLICATION':
      return {
        label: '신청현황 보러가기',
        title: '신청 내역',
        path: '/application-overview',
        disabled: false,
      }
    case 'NOT_APPLIED':
    case 'WINNER':
    case 'LOSER':
      return {
        label: '신청하러 가기',
        title: '당첨 내역',
        path: '/apply',
        disabled: true,
      }
    default:
      return {
        label: '로딩 중...',
        path: '',
        disabled: true,
      }
  }
}
const MainClient = () => {
  const { userInfo } = useUserStore()
  // const { isLoading } = useUserInfoQuery()
  const router = useRouter()

  if (!userInfo) return <LoadingSpinner />

  console.log(userInfo?.allocatedRoomName)
  const { label, path, disabled, title } = getButtonProps(userInfo.status)

  return (
    <div className="pt-10 pb-20">
      {/*타이틀 + 박스*/}
      <div className="mx-auto w-full max-w-[800px]">
        <div className="px-4 md:px-0 pb-4">
          {/*타이틀*/}

          <div className="flex text-xl md:text-2xl mb-4 justify-between">
            <div className="flex flex-row">
              <h1 className="font-semibold flex items-center">
                <span className="">{userInfo?.userName}</span>
              </h1>
              <h1>
                <span className="font-semibold">&nbsp;리더님,</span> 환영합니다
                👋
              </h1>
            </div>
            <div
              className="flex items-center justify-center cursor-pointer bg-gray-100 rounded px-2 text-sm gap-1 text-gray-600 hover:bg-gray-300 transition-colors duration-200 "
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">새로고침</span>
            </div>
          </div>

          {/*  /!*박스 내부*!/*/}
          <div className="">
            <div className="w-full bg-[#f5f5f5] px-4 py-6 md:p-10 rounded-[4px] mb-6 md:mb-[10px] shadow">
              <div className="flex-wrap md:flex-row flex-col">
                {/*신청마감*/}
                <div className="flex md:flex-row flex-col justify-between gap-4 md:gap-0">
                  <div className="flex w-full md:w-[150px] md:justify-between">
                    <div className="flex flex-row md:flex-col items-start gap-4 md:w-[150px] md:gap-0">
                      <div className="font-bold text-sm min-w-[70px] md:mb-1">
                        신청 기간
                      </div>

                      <span className="inline-block w-full min-w-[100px] md:w-[150px]">
                        <span>
                          {dayjs(userInfo?.applicationStart).format(
                            'MM/DD (주일)'
                          )}{' '}
                          <span className="font-bold">19:00 </span>~
                          <span className="block"></span>{' '}
                          {dayjs(userInfo?.applicationDeadline).format(
                            'MM/DD (월)'
                          )}{' '}
                          <span className="font-bold">
                            {userInfo?.applicationDeadline
                              .split('T')[1]
                              .split(':')
                              .slice(0, 2)
                              .join(':')}
                          </span>
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* 발표일시 */}
                  <div className="flex-row md:flex-col w-full md:w-[150px]">
                    <div className="flex flex-row gap-4 md:flex-col md:w-[150px] md:gap-0">
                      {' '}
                      <div className="font-bold text-sm min-w-[70px] md:mb-1">
                        발표 일시
                      </div>
                      <span className="inline-block w-full min-w-[100px] md:w-[150px]">
                        <span>
                          {/*{userInfo?.announcementTime.split('T')[0]} (월)*/}
                          {dayjs(userInfo?.announcementTime).format(
                            'MM/DD (월)'
                          )}
                        </span>
                      </span>
                      <span className="inline-block w-full md:w-[150px]">
                        <span className="font-bold">
                          {userInfo?.announcementTime
                            .split('T')[1]
                            .split(':')
                            .slice(0, 2)
                            .join(':')}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* 사용일 */}
                  <div className="flex-row md:flex-col w-full md:w-[150px]">
                    <div className="flex flex-row gap-4 md:flex-col md:w-[150px] md:gap-0">
                      {' '}
                      <div className="font-bold text-sm min-w-[70px] md:mb-1">
                        사용일
                      </div>
                      <span className="inline-block w-full min-w-[100px] md:w-[150px]">
                        {dayjs(userInfo?.useDate).format('MM/DD (주일)')}
                      </span>
                      <span className="inline-block w-full md:w-[150px]">
                        예배 후 ~<span className="font-bold">18:00</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* 구분 선 */}
                <hr className="w-full border-t border-gray-300 my-[30px] hidden md:block" />

                {/* 신청 내역 */}
                <div className="hidden md:block">
                  <div className="font-bold text-sm mb-1">{title}</div>
                  <div>
                    {getStatusMessage(
                      userInfo?.status,
                      userInfo?.roomName,
                      userInfo?.allocatedRoomName
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 모바일용 신청 내역 */}
            <div className="block md:hidden mb-2">
              <div className=" mt-4 shadow w-full bg-[#f5f5f5] p-4 py-6 rounded-[4px]">
                <div className="font-bold text-sm mb-2">{title}</div>
                <div>
                  {getStatusMessage(
                    userInfo?.status,
                    userInfo?.roomName,
                    userInfo?.allocatedRoomName
                  )}
                </div>
              </div>
            </div>

            <div>
              <GuideText
                deadlineTime={userInfo?.applicationDeadline
                  .split('T')[1]
                  .split(':')
                  .slice(0, 2)
                  .join(':')}
                announcementTime={userInfo?.announcementTime
                  .split('T')[1]
                  .split(':')
                  .slice(0, 2)
                  .join(':')}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 md:gap-10 mt-5 md:mt-12 md:pb-40 items-center justify-center px-4 md:px-0">
        <button
          disabled={disabled}
          onClick={() => {
            if (!disabled) router.push(path)
          }}
          className={`h-[60px] w-[380px] rounded-[4px] text-white text-base md:text-lg font-bold transition-colors duration-200 bg-main-d-black ${
            disabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#444]'
          }`}
        >
          {label}
        </button>

        {/* 당첨자 확인 버튼 > 추첨 이후에만 제공됨*/}
        {/*{title === '당첨 내역' && (*/}
        {/*  <button*/}
        {/*    className="h-[60px] min-w-[120px] md:w-[150px] rounded-[4px] text-white text-base md:text-lg font-bold transition-colors duration-200 bg-main-d-black hover:bg-[#444]"*/}
        {/*    onClick={() => router.push('/check-winner')}*/}
        {/*  >*/}
        {/*    당첨자 확인*/}
        {/*  </button>*/}
        {/*)}*/}
      </div>
    </div>
  )
}

export default MainClient

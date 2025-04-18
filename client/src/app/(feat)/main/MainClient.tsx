'use client'

import React from 'react'
import RedirectButton from '@/app/_component/button/RedirectButton'
import GuideText from '@/app/(feat)/_component/GuideText'
import { useUserStore } from '@/store/useUserStore'

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
)

const getStatusMessage = (
  status: string | undefined,
  roomName: string | undefined
) => {
  switch (status) {
    case 'NOT_APPLIED':
      return '신청 기간이 종료되었습니다. 다음 주엔 꼭 신청해 주세요! 😄'
    case 'BEFORE_APPLICATION':
      return `아직 신청하지 않으셨네요! 지금 바로 신청해 보세요!`
    case 'AFTER_APPLICATION':
      return (
        <>
          <span className="font-bold text-main-d-black">{roomName}</span>
          실로 신청이 완료되었습니다. 발표일을 기다려 주세요!
        </>
      )
    case 'WINNER':
      return (
        <>
          🎉 축하드립니다!{' '}
          <span className="font-bold text-main-d-black">{roomName}</span>{' '}
          소그룹실에 당첨되셨어요. 사용 일정을 확인해 주세요.
        </>
      )
    case 'LOSER':
      return '아쉽게도 이번에는 당첨되지 않았습니다. 다음 기회를 노려보세요! 💪'
    default:
      return '신청 상태를 불러오는 중입니다...'
  }
}

const MainClient = () => {
  const { userInfo } = useUserStore()

  return (
    <div className="flex flex-col items-center justify-center mb-24 w-full">
      <div className="w-web-main p-4">
        <div className="flex items-center justify-center">
          <div className="w-[800px]">
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
                <span className="font-semibold">리더님,</span> 환영합니다 👋
              </h1>
            </div>

            {/*  /!*박스 내부*!/*/}
            <div>
              <div className=" w-full bg-[#f5f5f5] p-10 rounded-[4px] mb-[10px]">
                <div className="flex flex-row gap-20 mb-[30px]">
                  <div className="w-[150px]">
                    <div className="font-bold text-sm">신청 마감</div>
                    <span className="inline-block w-[150px]">
                      {userInfo ? (
                        <>{userInfo.applicationDeadline.split('T')[0]} (월)</>
                      ) : (
                        <Skeleton className="w-[130px] h-5" />
                      )}
                    </span>

                    <br />

                    <span className="inline-block w-[150px]">
                      {userInfo ? (
                        userInfo.applicationDeadline
                          .split('T')[1]
                          .split(':')
                          .slice(0, 2)
                          .join(':')
                      ) : (
                        <Skeleton className="w-[60px] h-5" />
                      )}
                    </span>
                  </div>

                  <div className="w-[150px]">
                    <div className="font-bold text-sm">발표 일시</div>

                    <span className="inline-block w-[150px]">
                      {userInfo ? (
                        <>{userInfo.announcementTime.split('T')[0]} (월)</>
                      ) : (
                        <Skeleton className="w-[130px] h-5" />
                      )}
                    </span>

                    <br />

                    <span className="inline-block w-[150px]">
                      {userInfo ? (
                        userInfo.announcementTime
                          .split('T')[1]
                          .split(':')
                          .slice(0, 2)
                          .join(':')
                      ) : (
                        <Skeleton className="w-[60px] h-5" />
                      )}
                    </span>
                  </div>
                  <div className="w-[150px]">
                    <div className="font-bold text-sm">사용일</div>
                    <span className="w-[150px]">
                      {userInfo ? (
                        <>{userInfo?.useDate} (주일)</>
                      ) : (
                        <Skeleton className="w-[130px] h-5" />
                      )}
                    </span>
                    <div>나무모임 시간</div>
                  </div>
                </div>
                <hr className="border-t border-gray-300  mb-[30px]" />
                <div>
                  <div className="font-bold text-sm mb-1">신청 내역</div>
                  <div>
                    {getStatusMessage(userInfo?.status, userInfo?.roomName)}
                  </div>
                </div>
              </div>
              <GuideText
                deadlineTime={userInfo?.applicationDeadline
                  .split('T')[1]
                  .split(':')
                  .slice(0, 2)
                  .join(':')}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <RedirectButton buttonLabel={'신청하러 가기'} movePage={'/apply'} />
      </div>
    </div>
  )
}

export default MainClient

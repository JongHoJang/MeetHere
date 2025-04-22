import React from 'react'

interface GuideTextProps {
  deadlineTime?: string
  announcementTime?: string
}

const GuideText = ({ deadlineTime, announcementTime }: GuideTextProps) => {
  return (
    <div className="text-[12px] flex flex-wrap sm:justify-end">
      <span>* 신청은 매주&nbsp;</span>
      <span className="text-red-500 font-bold whitespace-nowrap">
        월요일 {deadlineTime} 까지 완료
      </span>
      해주세요.{' '}
      <div>
        <span className="text-red-500 font-bold whitespace-nowrap">
          <span className="text-transparent">*</span> {announcementTime}
        </span>
        <span>에 배정이 완료됩니다.</span>
      </div>
    </div>
  )
}

export default GuideText

import React from 'react'

interface GuideTextProps {
  deadlineTime?: string
}

const GuideText = ({ deadlineTime }: GuideTextProps) => {
  return (
    <div className="text-[12px] flex justify-end">
      * 신청은 매주&nbsp;
      <span className="text-red-500 font-bold">
        월요일 {deadlineTime} 까지 완료
      </span>
      해주세요. {deadlineTime} 에 배정이 완료됩니다.
    </div>
  )
}

export default GuideText

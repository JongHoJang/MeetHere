import React from 'react'

interface ApplyButtonProps {
  buttonLabel: string
  onClick: () => void
  disabled: boolean
}

const ApplyButton: React.FC<ApplyButtonProps> = ({
  buttonLabel,
  onClick,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col mb-5">
      <button
        type="submit"
        onClick={onClick}
        disabled={disabled}
        className={`
  w-full h-[60px] rounded-[4px] text-white text-[18px] font-bold transition-colors duration-200
  bg-main-d-black 
  hover:bg-[#444]
  disabled:bg-[#888] disabled:text-[#999] disabled:cursor-not-allowed
`}
      >
        {buttonLabel}
      </button>
    </div>
  )
}

export default ApplyButton

import React from 'react'

interface SubmitButtonProps {
  buttonLabel: string
  onClick?: () => void
  disabled?: boolean
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
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
        className={`w-full h-[60px] rounded-[4px] text-white text-[18px] font-bold transition-colors duration-200 bg-main-d-black 
    ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#444]'}
  `}
      >
        {buttonLabel}
      </button>
    </div>
  )
}

export default SubmitButton

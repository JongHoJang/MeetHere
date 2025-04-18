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
    <div>
      <button
        type="submit"
        onClick={onClick}
        disabled={disabled}
        className={`h-[60px] w-[380px] rounded-[4px] text-white text-[18px] font-bold transition-colors duration-200 
    ${
      disabled
        ? 'bg-gray-300 cursor-not-allowed'
        : 'bg-main-d-black hover:bg-[#444]'
    }
  `}
      >
        {buttonLabel}
      </button>
    </div>
  )
}

export default SubmitButton

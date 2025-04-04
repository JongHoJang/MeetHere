import React from 'react'

interface SubmitButtonProps {
  buttonLabel: string
  onClick?: () => void
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  buttonLabel,
  onClick,
}) => {
  return (
    <div>
      <button
        type="submit"
        className="h-[60px] w-[380px] bg-main-d-black rounded-[4px] text-white text-[18px] font-bold"
        onClick={onClick}
      >
        {buttonLabel}
      </button>
    </div>
  )
}

export default SubmitButton

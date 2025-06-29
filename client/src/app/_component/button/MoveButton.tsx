import React from 'react'

interface MoveButtonProps {
  buttonLabel: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

const MoveButton: React.FC<MoveButtonProps> = ({
  buttonLabel,
  type = 'button',
  onClick,
}) => {
  return (
    <div className="flex flex-col">
      <button
        type={type}
        className={`w-full h-[60px] rounded-[4px] text-white text-[18px] px-4 font-bold transition-colors duration-200
  bg-main-d-black 
  hover:bg-[#444]`}
        onClick={onClick}
      >
        {buttonLabel}
      </button>
    </div>
  )
}

export default MoveButton

import React from 'react'

interface ButtonProps {
  buttonLabel: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset' // ✅ 추가
}

const Button: React.FC<ButtonProps> = ({
  buttonLabel,
  onClick,
  type = 'button',
}) => {
  return (
    <div>
      <button
        type={type}
        className="h-[60px] w-[380px] bg-main-d-black rounded-[4px] text-white text-[18px] font-bold"
        onClick={onClick}
      >
        {buttonLabel}
      </button>
    </div>
  )
}

export default Button

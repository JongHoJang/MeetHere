import React from 'react'
import { useRouter } from 'next/navigation'

interface ButtonProps {
  buttonLabel: string
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ buttonLabel, onClick }) => {
  return (
    <div>
      <button
        type="button"
        className="h-[60px] w-[380px] bg-main-d-black rounded-[4px] text-white text-[18px] font-bold"
        onClick={onClick}
      >
        {buttonLabel}
      </button>
    </div>
  )
}

export default Button

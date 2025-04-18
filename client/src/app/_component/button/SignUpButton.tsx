// SignUpButton.tsx
import React from 'react'

interface SignupButtonProps {
  buttonLabel: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

const SignUpButton: React.FC<SignupButtonProps> = ({
  buttonLabel,
  type = 'button',
  onClick,
}) => {
  return (
    <div>
      <button
        type={type}
        className="h-[60px] w-[380px] bg-main-d-black hover:bg-[#444] rounded-[4px] text-white text-[18px] font-bold transition-colors duration-200"
        onClick={onClick}
      >
        {buttonLabel}
      </button>
    </div>
  )
}

export default SignUpButton

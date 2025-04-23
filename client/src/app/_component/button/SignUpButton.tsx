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
    <div className="flex flex-col mb-5">
      <button
        type={type}
        className={`w-full h-[60px] rounded-[4px] text-white text-[18px] font-bold transition-colors duration-200
  bg-main-d-black 
  hover:bg-[#444]`}
        onClick={onClick}
      >
        {buttonLabel}
      </button>
    </div>
  )
}

export default SignUpButton

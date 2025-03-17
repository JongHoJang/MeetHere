import React from 'react'
import { useRouter } from 'next/navigation'

interface ButtonProps {
  buttonLabel: string
  movePage: string
}

const Button: React.FC<ButtonProps> = ({ buttonLabel, movePage }) => {
  const router = useRouter()

  return (
    <div>
      <button
        type="submit"
        className="h-[60px] w-[380px] bg-main-d-black rounded-[4px] text-white text-[18px] font-bold"
        onClick={() => router.push(`${movePage}`)}
      >
        {buttonLabel}
      </button>
    </div>
  )
}

export default Button

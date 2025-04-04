import React from 'react'
import SignUpForm from '@/app/(auth)/signup/_component/SignUpForm'

const SignUpPage = () => {
  return (
    <div className="flex flex-col items-center justify-center mb-24 w-full bg-blue-300">
      <div className="w-[1200px] bg-red-400">
        <div className="mb-[84px]">
          <h2 className="text-[32px] font-bold">회원가입</h2>
          <h3 className="text-[20px] font-medium">
            가입을 위한 정보를 입력해주세요.
          </h3>
        </div>
        <div>
          <div className="flex items-center justify-center">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage

import React from 'react'
import SignUpForm from '@/app/(auth)/signup/_component/SignUpForm'

const SignUpPage = () => {
  return (
    <div className="pt-10 pb-10 md:pb-20">
      <div className="mx-auto w-full max-w-[1140px]">
        <div className="px-4 md:px-0 pb-4">
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold">회원가입</h2>
          </div>
          <div>
            <div className="items-start">
              <SignUpForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage

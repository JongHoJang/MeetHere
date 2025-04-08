'use client'

import React from 'react'
import InputField from '@/app/(auth)/_component/InputField'
import DropdownInputField from '@/app/(auth)/_component/DropDownInputField'
import Button from '@/app/_component/ReserveButton'
import { useState } from 'react'
import { signup } from '@/lib/auth'
import { useRouter } from 'next/navigation'

const SignUpForm = () => {
  const [username, setUsername] = useState('')
  const [dob, setDob] = useState('1994-01-01')
  const [memberId, setMemberId] = useState('')
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [community, setCommunity] = useState('')

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    if (name === 'username') setUsername(value)
    if (name === 'dob') setDob(value)
    if (name === 'memberId') setMemberId(value)
    if (name === 'userId') setUserId(value)
    if (name === 'password') setPassword(value)
    if (name === 'confirmPassword') setConfirmPassword(value)
    if (name === 'community') setCommunity(value)
  }
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }

    try {
      await signup({
        name: username,
        birthday: dob,
        churchMemberId: Number(memberId),
        email: userId,
        password,
        communityCode: community,
      })

      router.push('/login')
    } catch (err) {
      console.error(err)
      alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.')
    }

    // console.log({
    //   username,
    //   password,
    //   confirmPassword,
    //   dob,
    //   memberId,
    //   userId,
    //   community,
    // })
  }
  return (
    <div className="flex flex-col w-[600px] justify-center items-center">
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <InputField
              label="이름"
              id="username"
              name="username"
              type="text"
              placeholder="이름을 입력하세요"
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
          <div className="flex flex-row w-[600px] gap-[30px]">
            <div className="w-full">
              <InputField
                label="생년월일"
                id="dob"
                name="dob"
                type="date"
                // value={dob}
                placeholder="생년월일"
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full">
              <InputField
                label="교번"
                id="memberId"
                name="memberId"
                type="number"
                placeholder="교번을 입력하세요"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <InputField
              label="아이디"
              id="userId"
              name="userId"
              type="text"
              placeholder="아이디를 입력하세요"
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
          <div className="flex flex-row w-[600px] gap-[30px]">
            <div className="w-full">
              <InputField
                label="비밀번호"
                id="password"
                name="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full">
              <InputField
                label="비밀번호 확인"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <DropdownInputField
              label="공동체"
              id="community"
              name="community"
              // value={community}
              placeholder="공동체를 선택하세요"
              onChange={handleInputChange}
              className="w-full"
              options={[
                '요셉',
                '다윗',
                '에스더',
                '여호수아',
                '다니엘',
                '쁘아',
                '모세',
              ]}
            />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Button type="submit" buttonLabel="회원가입 하기" />
        </div>
      </form>
    </div>
  )
}

export default SignUpForm

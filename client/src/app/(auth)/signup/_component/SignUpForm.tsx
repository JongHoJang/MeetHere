'use client'

import React, { useState } from 'react'
import InputField from '@/app/(auth)/_component/InputField'
import DropdownInputField from '@/app/(auth)/_component/DropDownInputField'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import SignUpButton from '@/app/_component/button/SignUpButton'
import { signUp } from '@/lib/api/auth'
// import DatePickerInputField from '@/app/(auth)/_component/DatePickerInputField'
import { format } from 'date-fns'

const SignUpForm = () => {
  const router = useRouter()

  const [name, setName] = useState('')
  const [birthday, setBirthday] = useState('')
  // const [birthday, setBirthday] = useState<Date | null>(null)

  const [churchMemberId, setChurchMemberId] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [communityCode, setCommunityCode] = useState('')

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    if (name === 'name') setName(value)
    if (name === 'birthday') setBirthday(value)
    // if (name === 'birthday') {
    //   setBirthday(value ? new Date(value) : null)
    // }
    if (name === 'churchMemberId') setChurchMemberId(value)
    if (name === 'email') setEmail(value)
    if (name === 'password') setPassword(value)
    if (name === 'confirmPassword') setConfirmPassword(value)
    if (name === 'communityCode') setCommunityCode(value)
  }
  const formattedBirthday = birthday ? format(birthday, 'yyyy-MM-dd') : ''
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.')
      setPassword('')
      setConfirmPassword('')
      return
    }

    try {
      const result = await signUp({
        name,
        birthday: formattedBirthday,
        churchMemberId: parseInt(churchMemberId),
        email,
        password,
        communityCode,
      })

      console.log('회원가입 성공:', result)
      alert('회원가입이 완료되었습니다!')
      router.push('/login')
    } catch (e: unknown) {
      const error = e as AxiosError<{ message: string; errorCode: number }>
      if (error.response?.data?.errorCode === 20004) {
        alert(
          '입력하신 정보가 올바르지 않습니다. 가입 대상 확인란에 입력된 정보를 다시 확인해주세요.'
        )
      } else {
        alert('회원가입에 실패했습니다. 입력 정보를 다시 확인해주세요.')
      }
    }
  }

  return (
    <div className="flex flex-col items-center w-full">
      <form onSubmit={handleSubmit} className="w-full max-w-[1000px]">
        <div className="mb-6">
          <h3 className="text-lg md:text-xl font-bold">📌 가입 대상 확인</h3>
          <p className="text-md">
            교회에 등록된 정보(이름, 교번 등)을 기반으로 인증을 진행합니다.
          </p>
        </div>

        <InputField
          label="이름"
          id="name"
          name="name"
          type="text"
          placeholder="이름을 입력하세요"
          onChange={handleInputChange}
          className="w-full"
        />

        <div className="">
          <InputField
            label="생년월일"
            id="birthday"
            name="birthday"
            type="date"
            placeholder="생년월일을 선택해주세요"
            onChange={handleInputChange}
            className="w-full  h-[47px] sm:h-[58px]"
          />
          {/*<DatePickerInputField*/}
          {/*  label="생년월일"*/}
          {/*  id="birthday"*/}
          {/*  selectedDate={birthday}*/}
          {/*  onChange={setBirthday}*/}
          {/*  className="w-[100%] h-[47px] sm:h-[58px]"*/}
          {/*/>*/}
          <InputField
            label={
              <>
                교번
                <span className="ml-1 relative group cursor-pointer text-gray-400 text-xs align-top">
                  ⓘ
                  <div className="absolute  mt-1 w-[250px] bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    만나교회 어플 또는 담당 사역자에게 문의하세요.
                  </div>
                </span>
              </>
            }
            id="churchMemberId"
            name="churchMemberId"
            type="number"
            placeholder="교번을 입력하세요"
            onChange={handleInputChange}
            className="w-[100%] h-[47px] sm:h-[58px]"
          />
        </div>

        <DropdownInputField
          label="공동체"
          id="communityCode"
          name="communityCode"
          placeholder="공동체를 선택하세요"
          onChange={handleInputChange}
          className="w-full h-[47px] sm:h-[58px]"
          options={[
            { value: 1, label: '요셉' },
            { value: 2, label: '다윗' },
            { value: 3, label: '에스더' },
            { value: 4, label: '여호수아' },
            { value: 5, label: '다니엘' },
            { value: 6, label: '모세' },
            { value: 7, label: '쁘아' },
            { value: 8, label: '느헤미야' },
          ]}
        />

        <div className="border-t border-gray-300 my-12"></div>

        <div className="mb-6">
          <h3 className="text-lg md:text-xl font-bold">📌 로그인 정보 설정</h3>
          <p className="text-md">
            회원가입 후 로그인 시 사용할 정보를 입력해주세요.
          </p>
        </div>

        <InputField
          label="이메일(아이디)"
          id="email"
          name="email"
          type="email"
          placeholder="이메일을 입력하세요"
          onChange={handleInputChange}
          className="w-full"
        />

        <div className="flex flex-col sm:flex-row justify-between md:gap-4 w-full">
          <InputField
            label="비밀번호"
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            onChange={handleInputChange}
            className="w-full sm:w-[240px]"
            value={password}
          />
          <InputField
            label="비밀번호 확인"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            onChange={handleInputChange}
            className="w-full sm:w-[240px]"
            value={confirmPassword}
          />
        </div>

        <div className="mt-10 w-full">
          <div className="w-full max-w-[380px] mx-auto sm:px-0">
            <SignUpButton type="submit" buttonLabel="회원가입 하기" />
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignUpForm

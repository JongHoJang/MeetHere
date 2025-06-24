'use client'

import React, { useState } from 'react'
import InputField from '@/app/(auth)/_component/InputField'
import DatePickerInputField from '@/app/(auth)/_component/DatePickerInputField'
import DropdownInputField from '@/app/(auth)/_component/DropDownInputField'
import SignUpButton from '@/app/_component/button/SignUpButton'
import { format } from 'date-fns'
import { AxiosError } from 'axios'
import { changePasswordWithVerification } from '@/lib/api/auth'
import Modal from '@/app/_component/modal/ModalPage'
import ChangePasswordModal from '@/app/_component/modal/ChangePasswordModal'

const ChangePasswordForm = () => {
  const [name, setName] = useState('')
  const [birthday, setBirthday] = useState<Date | null>(null)
  const [churchMemberId, setChurchMemberId] = useState('')
  const [communityCode, setCommunityCode] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const formattedBirthday = birthday ? format(birthday, 'yyyy-MM-dd') : ''

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    if (name === 'name') setName(value)
    if (name === 'churchMemberId') setChurchMemberId(value)
    if (name === 'communityCode') setCommunityCode(value)
    if (name === 'email') setEmail(value)
    if (name === 'password') setPassword(value)
    if (name === 'confirmPassword') setConfirmPassword(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }

    try {
      await changePasswordWithVerification({
        name,
        birthday: formattedBirthday,
        churchMemberId: parseInt(churchMemberId),
        communityCode,
        email,
        password: password,
      })
      setIsModalOpen(true)
      // alert('비밀번호가 성공적으로 변경되었습니다.')
    } catch (e: unknown) {
      const error = e as AxiosError<{ message: string; errorCode: number }>
      if (error.response?.data?.errorCode === 20006) {
        alert('입력하신 정보가 일치하지 않습니다.')
      } else {
        alert('비밀번호 변경에 실패했습니다. 다시 시도해주세요.')
      }
    }
  }

  return (
    <div className="flex flex-col items-center w-full">
      <form onSubmit={handleSubmit} className="w-full max-w-[1000px]">
        <div className="mb-6">
          <h3 className="text-lg md:text-xl font-bold">🔐 비밀번호 변경</h3>
          <p className="text-md">
            가입 시 등록한 정보를 입력하면 비밀번호를 변경 할 수 있습니다.
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

        <DatePickerInputField
          label="생년월일"
          id="birthday"
          selectedDate={birthday}
          onChange={setBirthday}
          className="w-full h-[47px] sm:h-[58px]"
        />

        <InputField
          label="교번"
          id="churchMemberId"
          name="churchMemberId"
          type="number"
          placeholder="교번을 입력하세요"
          onChange={handleInputChange}
          className="w-full h-[47px] sm:h-[58px]"
        />

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

        <InputField
          label="이메일"
          id="email"
          name="email"
          type="email"
          placeholder="이메일을 입력하세요"
          onChange={handleInputChange}
          className="w-full"
        />

        <hr className="border-t border-gray-200 my-10" />

        <InputField
          label="새 비밀번호"
          id="password"
          name="password"
          type="password"
          placeholder="새 비밀번호를 입력하세요"
          onChange={handleInputChange}
          className="w-full h-[47px] sm:h-[58px]"
          value={password}
        />

        <InputField
          label="비밀번호 확인"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          onChange={handleInputChange}
          className="w-full h-[47px] sm:h-[58px]"
          value={confirmPassword}
        />

        <div className="mt-10 w-full max-w-[380px] mx-auto sm:px-0">
          <SignUpButton type="submit" buttonLabel="비밀번호 변경하기" />
        </div>
      </form>
      {isModalOpen && (
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ChangePasswordModal
            modalTitle="비밀번호 변경 완료"
            modalDescription="새 비밀번호로 다시 로그인해 주세요."
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  )
}

export default ChangePasswordForm

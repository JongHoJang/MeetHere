'use client'

import React, { useState } from 'react'
import InputField from '@/app/(auth)/_component/InputField'
import DatePickerInputField from '@/app/(auth)/_component/DatePickerInputField'
import SignUpButton from '@/app/_component/button/SignUpButton'
import { AxiosError } from 'axios'
import { format } from 'date-fns'
import { findEmail } from '@/lib/api/auth'
import DropdownInputField from '@/app/(auth)/_component/DropDownInputField'
import Modal from '@/app/_component/modal/ModalPage'
import FindEmailModal from '@/app/_component/modal/FindEmailModal'

const FindEmailForm = () => {
  const [name, setName] = useState('')
  const [birthday, setBirthday] = useState<Date | null>(null)
  const [churchMemberId, setChurchMemberId] = useState('')
  const [communityCode, setCommunityCode] = useState('')
  const [foundEmail, setFoundEmail] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const formattedBirthday = birthday ? format(birthday, 'yyyy-MM-dd') : ''

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    if (name === 'name') setName(value)
    if (name === 'churchMemberId') setChurchMemberId(value)
    if (name === 'communityCode') setCommunityCode(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const result = await findEmail({
        name,
        birthday: formattedBirthday,
        churchMemberId: parseInt(churchMemberId),
        communityCode,
      })

      setFoundEmail(result.email)
      setIsModalOpen(true) // 모달 열기
    } catch (e: unknown) {
      const error = e as AxiosError<{ message: string; errorCode: number }>
      if (error.response?.data?.errorCode === 20006) {
        alert('입력한 정보와 일치하는 사용자를 찾을 수 없습니다.')
      } else {
        alert('이메일 조회에 실패했습니다. 관리자에게 문의해주세요.')
      }
    }
  }

  return (
    <div className="flex flex-col items-center w-full">
      <form className="w-full max-w-[1000px]" onSubmit={handleSubmit}>
        <div className="mb-6">
          <h3 className="text-lg md:text-xl font-bold">
            📨 아이디(이메일) 찾기
          </h3>
          <p className="text-md">
            가입 시 등록한 정보를 입력하면 아이디(이메일)를 확인할 수 있습니다.
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

        <div className="mt-10 w-full">
          <div className="w-full max-w-[380px] mx-auto sm:px-0">
            <SignUpButton type="submit" buttonLabel="이메일 확인하기" />
          </div>
        </div>
      </form>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <FindEmailModal
          modalTitle="이메일 확인 완료"
          modalDescription={`입력하신 정보로 등록된 이메일은 "${foundEmail}" 입니다.`}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  )
}

export default FindEmailForm

'use client'

import { useState } from 'react'
import InputField from '../../_component/InputField'
import { useRouter } from 'next/navigation'
import Button from '@/app/_component/Button'

const LoginForm = () => {
  const router = useRouter()

  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ userId, password }) // 폼 제출 시 최종 상태 출력
  }

  return (
    <form className="w-[380px]" onSubmit={handleSubmit}>
      <InputField
        label="아이디(교번)"
        id="username"
        name="username"
        type="text"
        placeholder="만나교회 교번 (ex.12345)"
        onChange={e => setUserId(e.target.value)}
      />

      <InputField
        label="비밀번호"
        id="password"
        name="password"
        type="password"
        placeholder="8자 이상의 비밀번호"
        onChange={e => setPassword(e.target.value)}
      />

      <div>
        <Button buttonLabel={'로그인'} movePage={'dashboard'} />
      </div>
    </form>
  )
}

export default LoginForm

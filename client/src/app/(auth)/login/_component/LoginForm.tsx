'use client'

import React from 'react'
import { useState } from 'react'
import InputField from '../../_component/InputField'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/app/store/useAuthStore'
import SubmitButton from '@/app/_component/SubmitButton'
import { login } from '@/lib/auth'
import { fetchUserUsage } from '@/lib/api/user'

const LoginForm = () => {
  const router = useRouter()
  const { login: setAuth, setUserInfo } = useAuthStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // 로그인 요청
      const { accessToken, refreshToken, userId } = await login({
        email,
        password,
      })

      // 로그인 상태 저장
      setAuth({ userId: String(userId), accessToken, refreshToken })

      // 사용자 정보 가져와서 저장
      const userInfo = await fetchUserUsage()
      setUserInfo(userInfo)
      localStorage.setItem('userInfo', JSON.stringify(userInfo))

      router.push('/dashboard')
    } catch (err) {
      console.error(err)
      alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.')
    }
  }
  return (
    <form className="w-[380px]" onSubmit={handleSubmit}>
      <InputField
        label="아이디(교번)"
        id="email"
        name="email"
        type="email"
        placeholder="만나교회 교번 (ex.12345)"
        onChange={e => setEmail(e.target.value)}
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
        <SubmitButton buttonLabel={'로그인'} />
      </div>
    </form>
  )
}

export default LoginForm

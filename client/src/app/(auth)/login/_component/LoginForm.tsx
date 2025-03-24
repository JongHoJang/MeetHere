'use client'

import { useState } from 'react'
import InputField from '../../_component/InputField'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/app/store/useAuthStore'
import SubmitButton from '@/app/_component/SubmitButton'
import { login } from '@/lib/api/auth'

const LoginForm = () => {
  const setUser = useAuthStore(state => state.setUser)

  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const data = await login({ email, password })

      // 예시: data 안에 email 있다고 가정
      setUser({
        email: data.email,
        userName: data.userName,
      })

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

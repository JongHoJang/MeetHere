import { LoginForm } from '@/types/auth'
import { api } from '@/lib/axios'

// 로그인 axios
export const login = async (formData: LoginForm) => {
  const res = await api.post('/api/login', formData, { withCredentials: true })
  return res.data
}

// 회원가입 axios
export const signup = async (formData: {
  name: string
  birthday: string
  churchMemberId: number
  email: string
  password: string
  communityCode: string
}) => {
  const res = await api.post('/api/signup', formData)
  return res.data
}

import { LoginForm } from '@/types/auth'

export const login = async (formData: LoginForm) => {
  const res = await fetch('http://43.203.128.192:8080/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })
  if (!res.ok) throw new Error('Login failed')
  return res.json()
}

export const signup = async (formData: {
  email: string
  password: string
  nickname: string
}) => {
  const res = await fetch('/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })
  if (!res.ok) throw new Error('Signup failed')
  return res.json()
}

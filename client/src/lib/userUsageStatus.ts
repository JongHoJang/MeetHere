import { LoginForm } from '@/types/auth'

export const userUsageStatus = async (formData: LoginForm) => {
  const res = await fetch('http://43.203.128.192:8080/api/getUserUsageStatus', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })
  if (!res.ok) throw new Error('Login failed')
  return res.json()
}

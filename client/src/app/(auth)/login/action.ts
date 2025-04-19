'use server'

import { login } from '@/lib/api/auth'
import { redirect } from 'next/navigation'

export const handleLoginAction = async (formData: FormData): Promise<void> => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const result = await login({ email, password })

  if (!result.success) {
    // 나중에 실패 시 에러 페이지 redirect 또는 메시지 반환 가능
    console.error('로그인 실패:', result.error)
    return
  }

  // ✅ 쿠키는 이미 서버에서 내려옴 → 이제 redirect만 하면 됨
  redirect('/main')
}

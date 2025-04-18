import LoginForm from '@/app/(auth)/login/_component/LoginForm'
import SignUpButton from '@/app/(auth)/login/_component/SignUpButton'

const LoginPage = async () => {
  return (
    <div>
      <div className="flex flex-col items-center mt-14 mb-24">
        <h2 className="text-4xl font-bold mb-3">🗳 여기서 만나 🗳</h2>
        <h3 className="text-xl font-medium">
          나무모임을 위한 공간을 신청하고 관리하는
        </h3>
        <h3 className="text-xl font-medium">리더들을 위한 서비스입니다.</h3>
      </div>
      <div className="flex flex-col items-center gap-4">
        <LoginForm />
        <SignUpButton />
      </div>
    </div>
  )
}

export default LoginPage

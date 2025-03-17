import LoginForm from '@/app/(auth)/login/_component/LoginForm'
import SignUpButton from '@/app/(auth)/login/_component/SignUpButton'

const App = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center mb-24">
        <h2 className="text-[32px] font-bold">만청 소그룹실 예약</h2>
        <h3 className="text-[20px] font-medium">
          만청 소그룹실 예약 관련 문구 (설명글)
        </h3>
      </div>
      <div className="flex flex-col items-center">
        <LoginForm />
        <SignUpButton />
      </div>
    </div>
  )
}

export default App

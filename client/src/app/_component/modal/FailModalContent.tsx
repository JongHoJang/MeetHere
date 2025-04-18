import SubmitButton from '@/app/_component/button/SubmitButton'
import { useRouter } from 'next/navigation'

interface FailProps {
  onClose: () => void
}

export const FailModalContent = ({ onClose }: FailProps) => {
  const router = useRouter()

  return (
    <div className="flex flex-col justify-center items-center text-center">
      <h2 className="text-xl font-bold mb-6">예약에 실패했습니다.</h2>
      <div className="mb-4">
        <p>예약을 다시 시도해 주세요.</p>
        <p>문제가 계속되면 관리자에게 문의해 주세요.</p>
      </div>

      <SubmitButton
        onClick={() => {
          onClose()
          router.push('/main')
        }}
        buttonLabel={'확인'}
      />
    </div>
  )
}

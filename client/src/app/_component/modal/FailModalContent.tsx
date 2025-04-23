import SubmitButton from '@/app/_component/button/SubmitButton'
import { useRouter } from 'next/navigation'

interface FailProps {
  onClose: () => void
}

export const FailModalContent = ({ onClose }: FailProps) => {
  const router = useRouter()

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-6">예약에 실패했습니다.</h2>
      <div className="mb-4 text-center w-[320px]">
        <p>예약을 다시 시도해 주세요.</p>
        <p>문제가 계속되면 목회팀에게 문의해 주세요.</p>
      </div>

      <div className="w-full max-w-[300px] mx-auto">
        <SubmitButton
          onClick={() => {
            onClose()
            router.push('/apply')
          }}
          buttonLabel={'확인'}
        />
      </div>
    </div>
  )
}

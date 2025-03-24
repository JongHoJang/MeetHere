import { useRouter } from 'next/navigation'

interface Props {
  movePage: string
  onClose: () => void
}

export default function SuccessModalContent({ movePage, onClose }: Props) {
  const router = useRouter()

  const handleConfirm = () => {
    onClose()
    setTimeout(() => {
      router.push(movePage)
    }, 100)
  }

  return (
    <>
      <h2 className="text-lg font-bold mb-2">신청 완료</h2>
      <p className="mb-4">회의실 신청이 완료되었습니다.</p>
      <button
        onClick={handleConfirm}
        className="px-3 py-1 bg-blue-500 text-white rounded"
      >
        확인
      </button>
    </>
  )
}

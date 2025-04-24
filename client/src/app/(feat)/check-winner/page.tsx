import CheckWinnerClient from '@/app/(feat)/check-winner/_component/CheckWinnerClient'

const CheckWinner = async () => {
  return (
    // <Suspense fallback={<LoadingSpinner />}>
    <CheckWinnerClient />
    // {/*</Suspense>*/}
  )
}

export default CheckWinner

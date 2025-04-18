// 'use client'
//
// import React, { useEffect, useState } from 'react'
// import SignUpButton from '@/app/_component/button/SignUpButton'
// import { usingRoomUserList } from '@/lib/api/roomController'
//
// interface Props {
//   modalTitle?: string
//   modalDescription?: string
//   onClose: () => void
// }
//
// type MatchingData = {
//   roomName: string | null
//   winners: {
//     userName: string | 'dd'
//     useDate: string | null
//   }[]
// }
//
// export default function MatchingModal({ onClose }: Props) {
//   const [matchingList, setMatchingList] = useState<MatchingData[] | null>(null)
//
//   const handleClose = () => {
//     onClose()
//   }
//
//   useEffect(() => {
//     const fetchMatchingRoom = async () => {
//       try {
//         const data = await usingRoomUserList()
//         setMatchingList(data)
//       } catch (err) {
//         console.error('방 목록 불러오기 실패', err)
//       }
//     }
//
//     fetchMatchingRoom()
//   }, [])
//   return (
//     <>
//       {/*{console.log('✅ matchingList:', matchingList)}*/}
//       <div className="flex flex-col justify-center items-center w-full">
//         <h2 className="text-lg font-bold mb-2">당첨자 확인</h2>
//         <div className="mb-4 flex flex-row">
//           {matchingList?.map((room, idx) => (
//             <div key={idx}>
//               <h2>{room.roomName}</h2>
//               <ul>
//                 {room.winners.map((winner, wIdx) => {
//                   console.log('winner:', winner)
//                   return <li key={wIdx}>{winner.userName || '아무개'}</li>
//                 })}
//               </ul>
//             </div>
//           ))}
//         </div>
//         <SignUpButton buttonLabel={'닫기'} onClick={handleClose} />
//       </div>
//     </>
//   )
// }

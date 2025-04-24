import { SyncLoader } from 'react-spinners'
import React from 'react'

export default function Loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-white">
      <div className="flex flex-col items-center">
        <SyncLoader color="#3B82F6" size={12} speedMultiplier={1} />
        <p className="mt-4 text-gray-700 font-semibold text-lg">
          잠시만 기다려주세요.
        </p>
      </div>
    </div>
  )
}

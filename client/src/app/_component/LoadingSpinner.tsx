'use client'

import React from 'react'
import { SyncLoader } from 'react-spinners'

const LoadingSpinner = () => {
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

export default LoadingSpinner

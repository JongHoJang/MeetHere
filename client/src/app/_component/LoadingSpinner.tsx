'use client'

import React from 'react'
import { SyncLoader } from 'react-spinners'

const LoadingSpinner = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-white">
      <div className="flex flex-col items-center">
        {/*<svg*/}
        {/*  className="w-12 h-12 animate-spin text-blue-500"*/}
        {/*  fill="none"*/}
        {/*  viewBox="0 0 24 24"*/}
        {/*>*/}
        {/*  <circle*/}
        {/*    className="opacity-25"*/}
        {/*    cx="12"*/}
        {/*    cy="12"*/}
        {/*    r="10"*/}
        {/*    stroke="currentColor"*/}
        {/*    strokeWidth="4"*/}
        {/*  />*/}
        {/*  <path*/}
        {/*    className="opacity-75"*/}
        {/*    fill="currentColor"*/}
        {/*    d="M4 12a8 8 0 018-8v8z"*/}
        {/*  />*/}
        {/*</svg>*/}

        <SyncLoader color="#3B82F6" size={12} speedMultiplier={1} />
        <p className="mt-4 text-gray-700 font-semibold text-lg">
          잠시만 기다려주세요.
        </p>
      </div>
    </div>
  )
}

export default LoadingSpinner

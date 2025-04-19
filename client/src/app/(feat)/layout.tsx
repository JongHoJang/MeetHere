import React from 'react'
import ClientUserLoader from '@/app/(feat)/_component/ClientUserLoader'

export default function FeatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClientUserLoader>
      <div className="my-10">{children}</div>
    </ClientUserLoader>
  )
}

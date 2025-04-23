import React from 'react'
import ClientUserLoader from '@/app/(feat)/_component/ClientUserLoader'

export default function FeatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientUserLoader>{children}</ClientUserLoader>
}

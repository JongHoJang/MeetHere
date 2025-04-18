import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
// import Header from '@/app/(feat)/_component/Header'
import Footer from '@/app/_component/Footer'
import FeatHeader from '@/app/_component/Header'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '만청 소그룹실 예약 시스템',
  description: '만나교회 청년부 소그룹실 예약 시스템입니다.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <FeatHeader />
        {children}
        <Footer />
      </body>
    </html>
  )
}

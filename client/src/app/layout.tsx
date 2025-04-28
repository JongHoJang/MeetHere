import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Footer from '@/app/_component/Footer'
import { pretendard } from '@/app/_fonts/pretendard'
import Header from '@/app/_component/Header'
import { ReactQueryProvider } from '@/app/providers/ReactProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '여기서 만나',
  description: '만나교회 청년부 소그룹실 예약 시스템입니다.',
  openGraph: {
    title: '여기서 만나',
    description: '만나교회 청년부 소그룹실 예약 시스템입니다.',
    url: 'https://group-room-reservation.vercel.app/',
    siteName: '여기서 만나',
    images: [
      {
        url: 'https://group-room-reservation.vercel.app/thumbnail.png', // ← 썸네일 이미지 URL
        width: 1200,
        height: 630,
        alt: '만청 소그룹실 예약 시스템 썸네일',
      },
    ],
    type: 'website',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={pretendard.className}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-pretendard min-h-screen flex flex-col`}
      >
        <ReactQueryProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  )
}

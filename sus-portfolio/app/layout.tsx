import type { Metadata } from 'next'
import { Courier_Prime, DM_Mono } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'
import LoadingWrapper from '@/components/LoadingWrapper'

const courierPrime = Courier_Prime({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const dmMono = DM_Mono({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sruthilaya U.S. — AI/ML Engineer',
  description: 'AI/ML Engineer. Builder. Future founder.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${courierPrime.variable} ${dmMono.variable}`}
    >
      <body>
        <CustomCursor />
        <LoadingWrapper>
          {children}
        </LoadingWrapper>
      </body>
    </html>
  )
}
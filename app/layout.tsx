import React from "react"
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' })
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Ambassador International School | Excellence in Education',
  description: 'Ambassador International School in Lesotho offers world-class education from Pre-School through Primary. Join our community of learners and achieve academic excellence.',
  keywords: ['international school', 'Lesotho', 'education', 'primary school', 'preschool', 'STEM', 'arts'],
  icons: {
    icon: [
      {
        url: '/images/logo.png',
        media: '(prefers-color-scheme: light)',
      },
      {
                url: '/images/logo.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
               url: '/images/logo.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/images/logo.png',
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: '#1e3a5f',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}

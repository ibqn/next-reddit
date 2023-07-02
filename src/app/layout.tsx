import '@/styles/globals.css'
import { IBM_Plex_Sans } from 'next/font/google'
import { type ReactNode } from 'react'

const font = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
})

export const metadata = {
  title: 'Next Reddit',
  description: 'Next Reddit',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}

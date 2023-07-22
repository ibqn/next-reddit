import { Navbar } from '@/components/navbar'
import { Toaster } from '@/components/ui/toaster'
import { Providers } from '@/lib/providers'
import '@/styles/globals.css'
import { cn } from '@/utils'
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

type Props = {
  children: ReactNode
  authModal: ReactNode
}

export default function RootLayout({ children, authModal }: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(font.className, 'min-h-screen bg-slate-50 pt-12 font-light text-slate-900 antialiased')}>
        <Providers>
          <Navbar />
          {authModal}

          <div className="container mx-auto h-full max-w-7xl pt-12">{children}</div>
        </Providers>

        <Toaster />
      </body>
    </html>
  )
}

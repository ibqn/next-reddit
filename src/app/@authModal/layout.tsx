import { CloseModal } from '@/components/close-modal'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="fixed inset-0 z-10 bg-white/70">
      <div className="container mx-auto flex h-full max-w-lg items-center">
        <div className="relative h-fit w-full rounded-lg bg-white px-2 py-20 shadow-xl">
          <div className="absolute right-4 top-4">
            <CloseModal />
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

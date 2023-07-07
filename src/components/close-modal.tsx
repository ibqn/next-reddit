'use client'

import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'

type Props = {}

export function CloseModal(props: Props) {
  const router = useRouter()

  return (
    <Button
      variant="subtle"
      className="h-6 w-6 rounded-md p-0"
      onClick={() => {
        router.back()
      }}
    >
      <X aria-label="close modal" className="h-4 w-4" />
    </Button>
  )
}

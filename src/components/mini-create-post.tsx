'use client'

import { type Session } from 'next-auth'
import { UserAvatar } from './user-avatar'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { ImageIcon, Link2 } from 'lucide-react'
import { useCallback } from 'react'

type Props = {
  session: Session | null
}

export const MiniCreatePost = (props: Props) => {
  const { session } = props
  const pathname = usePathname()
  const router = useRouter()
  const gotoSubmit = useCallback(() => router.push(`${pathname}/submit`), [pathname, router])

  return (
    <div className="flex justify-between overflow-hidden rounded-md bg-white p-4 shadow">
      <div className="relative">
        <UserAvatar user={session?.user ?? null} />
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 outline outline-2 outline-white" />
      </div>
      <Input className="mx-6" onClick={gotoSubmit} readOnly placeholder="Create post" />
      <Button onClick={gotoSubmit} className="px-2" variant="ghost">
        <ImageIcon className="text-zinc-600" />
      </Button>
      <Button onClick={gotoSubmit} className="px-2" variant="ghost">
        <Link2 className="text-zinc-600" />
      </Button>
    </div>
  )
}

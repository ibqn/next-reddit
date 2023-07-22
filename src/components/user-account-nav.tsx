'use client'

import Link from 'next/link'
import { User } from 'next-auth'
import { signOut } from 'next-auth/react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { UserAvatar } from '@/components/user-avatar'
import { ClientOnly } from './client-only'

type Props = {
  user: User
}

export function UserAccountNav({ user }: Props) {
  return (
    <ClientOnly fallback={<UserAvatar user={user} className="h-8 w-8" />}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar user={user} className="h-8 w-8" />
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent className="bg-white" align="end">
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                {user.name && <p className="font-medium">{user.name}</p>}
                {user.email && <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>}
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/">Feed</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/r/create">Create Community</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={(event) => {
                event.preventDefault()
                signOut({
                  callbackUrl: `${window.location.origin}/sign-in`,
                })
              }}
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </ClientOnly>
  )
}

'use client'

import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { usePathname } from 'next/navigation'

type Props = {}

export const SignInButton = (props: Props) => {
  const pathname = usePathname()

  if (pathname.endsWith('/sign-in')) {
    return null
  }

  return (
    <Link href="/sign-in" className={buttonVariants()}>
      Sign In
    </Link>
  )
}

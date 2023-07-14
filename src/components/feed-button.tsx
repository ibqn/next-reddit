'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { buttonVariants } from './ui/button'
import { ChevronLeft } from 'lucide-react'

type Props = {}

export const FeedButton = (props: Props) => {
  const pathname = usePathname()

  const subredditPath = useMemo(() => {
    const destructuredPath = pathname.split('/')

    if (destructuredPath.length > 3) {
      return destructuredPath.slice(0, 3).join('/')
    }

    return '/'
  }, [pathname])

  return (
    <Link href={subredditPath} className={buttonVariants({ variant: 'ghost' })}>
      <ChevronLeft className="mr-1 h-4 w-4" />
      {subredditPath === '/' ? 'Back home' : 'Back to community'}
    </Link>
  )
}

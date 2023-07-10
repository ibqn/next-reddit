import { getAuthSession } from '@/lib/auth'
import { ReactNode } from 'react'
import { prisma } from '@/lib/prisma'

type Props = {
  children: ReactNode
  params: { subreddit: string }
}

export default async function SubredditLayout({ children, params }: Props) {
  const { subreddit: name } = params
  const session = await getAuthSession()

  const subreddit = await prisma.subreddit.findFirst({
    where: { name },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
        },
      },
    },
  })

  return <div>{children}</div>
}

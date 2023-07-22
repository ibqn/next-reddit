import { MiniCreatePost } from '@/components/mini-create-post'
import { PostFeed } from '@/components/post-feed'
import { getAuthSession } from '@/lib/auth'
import { paginationSize } from '@/lib/config'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    subreddit: string
  }
}

export default async function SubredditPage({ params }: Props) {
  const { subreddit: name } = params
  const session = await getAuthSession()

  const subreddit = await prisma.subreddit.findUnique({
    where: { name },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          subreddit: true,
        },
        orderBy: { createdAt: 'desc' },
        take: paginationSize,
      },
    },
  })

  if (!subreddit) {
    return notFound()
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="h-14 text-3xl font-bold md:text-4xl">r/{subreddit.name}</h1>
      <MiniCreatePost session={session} />

      <PostFeed initialPosts={subreddit.posts} subredditName={subreddit.name} />
    </div>
  )
}

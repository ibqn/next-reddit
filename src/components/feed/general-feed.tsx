import { paginationSize } from '@/lib/config'
import { prisma } from '@/lib/prisma'
import { PostFeed } from '@/components/post-feed'

type Props = {}

export const GeneralFeed = async (props: Props) => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      votes: true,
      author: true,
      comments: true,
      subreddit: true,
    },
    take: paginationSize * 2,
  })
  return <PostFeed initialPosts={posts} />
}

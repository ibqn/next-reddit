import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

type Props = {
  postId: string
}

export const CommentsSection = async ({ postId }: Props) => {
  const session = await getAuthSession()

  const comments = await prisma.comment.findMany({
    where: {
      postId,
      replyToId: null, // only fetch top-level comments
    },
    include: {
      author: true,
      votes: true,
      replies: {
        // first level replies
        include: {
          author: true,
          votes: true,
        },
      },
    },
  })

  return <div>CommentsSection</div>
}

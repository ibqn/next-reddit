import { type Post, type Vote, VoteType } from '@prisma/client'
import { PostVoteClient } from './client'
import { getAuthSession } from '@/lib/auth'

type Props = {
  post: Post & { votes: Vote[] }
}

export const PostVoteServer = async (props: Props) => {
  const { post } = props

  const session = await getAuthSession()

  const votesCount = post.votes.reduce((count, vote) => {
    if (vote.type === VoteType.UP) {
      return count + 1
    }

    if (vote.type === VoteType.DOWN) {
      return count - 1
    }

    return count
  }, 0)

  const currentVote = post.votes.find((vote) => vote.userId === session?.user?.id)?.type ?? null

  return <PostVoteClient postId={post.id} votesCount={votesCount} currentVote={currentVote} />
}

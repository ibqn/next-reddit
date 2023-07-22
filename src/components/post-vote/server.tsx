import { Post, Vote } from '@prisma/client'
import { PostVoteClient } from './client'

type Props = {
  postId: string
  post: Post & { votes: Vote[] }
}

export const PostVoteServer = (props: Props) => {
  const { postId } = props

  return <PostVoteClient postId={postId} />
}

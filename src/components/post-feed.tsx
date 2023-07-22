import { Comment, Post, User, Vote } from '@prisma/client'
import { PostItem } from './post-item'

type Props = {
  initialPosts: (Post & {
    author: User
    comments: Comment[]
    votes: Vote[]
  })[]
  subredditName: string
}

export const PostFeed = (props: Props) => {
  const { initialPosts, subredditName } = props

  return (
    <div className="col-span-2 flex flex-col gap-6">
      {initialPosts.map((post, index) => {
        return <PostItem key={post.id} post={post} subredditName={subredditName} />
      })}
    </div>
  )
}

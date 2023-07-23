import { Subreddit, type Comment, type Post, type User, type Vote } from '@prisma/client'
import { PostItem } from '@/components/post-item'
import { PostVoteServer } from '@/components/post-vote'

type Props = {
  initialPosts: (Post & {
    author: User
    comments: Comment[]
    votes: Vote[]
    subreddit?: Subreddit
  })[]
  subredditName?: string
}

export const PostFeed = (props: Props) => {
  const { initialPosts } = props

  return (
    <div className="col-span-2 flex flex-col gap-6">
      {initialPosts.map((post) => {
        const subredditName = props.subredditName ?? post.subreddit?.name!

        return (
          <PostItem
            key={post.id}
            post={post}
            subredditName={subredditName}
            voteComponent={<PostVoteServer post={post} />}
          />
        )
      })}
    </div>
  )
}

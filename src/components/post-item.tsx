import { Comment, type Post, type User, type Vote } from '@prisma/client'
import { MessageSquare } from 'lucide-react'
import Link from 'next/link'

type Props = {
  post: Post & {
    author: User
    comments: Comment[]
    votes: Vote[]
  }
  subredditName: string
}

export const PostItem = (props: Props) => {
  const { post, subredditName } = props

  return (
    <div className="rounded-md bg-white shadow-md">
      <div className="flex flex-row justify-between px-6 py-4">post</div>

      <div className="z-20 bg-gray-50 px-4 py-4 text-sm sm:px-6">
        <Link href={`/r/${subredditName}/post/${post.id}`} className="flex w-fit items-center gap-2">
          <MessageSquare className="h-4 w-4" /> {post.comments.length} comments
        </Link>
      </div>
    </div>
  )
}

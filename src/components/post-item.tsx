'use client'

import { Comment, type Post, type User, type Vote } from '@prisma/client'
import { formatDistanceToNow } from 'date-fns'
import { MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { EditorOutput } from './editor-output'
import { OutputData } from '@editorjs/editorjs'
import { useElementSize } from '@mantine/hooks'
import { ReactNode } from 'react'

type Props = {
  post: Post & {
    author: User
    comments: Comment[]
    votes: Vote[]
  }
  subredditName: string
  voteComponent: ReactNode
}

export const PostItem = (props: Props) => {
  const { post, subredditName, voteComponent } = props
  const { ref: postRef, height } = useElementSize()

  return (
    <div className="rounded-md bg-white shadow-md">
      <div className="flex flex-row justify-between px-6 py-4">
        {voteComponent}

        <div className="w-0 flex-1">
          <div className="mt-1 max-h-40 text-xs text-gray-500">
            <Link className="text-sm text-zinc-900 underline underline-offset-2" href={`/r/${subredditName}`}>
              r/{subredditName}
            </Link>
            <span className="px-1">•</span>
            <span>Posted by u/{post.author.username}</span>{' '}
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </div>

          <Link href={`/r/${subredditName}/post/${post.id}`}>
            <h1 className="py-2 text-lg font-semibold leading-6 text-gray-900">{post.title}</h1>
          </Link>

          <div className="relative max-h-40 w-full overflow-clip text-sm" ref={postRef}>
            <EditorOutput content={post.content as unknown as OutputData} />
            {height >= 160 && (
              // blur bottom if content is too long
              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent"></div>
            )}
          </div>
        </div>
      </div>

      <div className="z-20 bg-gray-50 px-4 py-4 text-sm sm:px-6">
        <Link href={`/r/${subredditName}/post/${post.id}`} className="flex w-fit items-center gap-2">
          <MessageSquare className="h-4 w-4" /> {post.comments.length} comments
        </Link>
      </div>
    </div>
  )
}

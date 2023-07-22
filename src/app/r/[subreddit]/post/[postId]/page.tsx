import { PostVoteServer, PostVoteShell } from '@/components/post-vote'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { Loader2 } from 'lucide-react'
import { EditorOutput } from '@/components/editor-output'
import { CommentsSection } from '@/components/comments-section'
import { OutputData } from '@editorjs/editorjs'

type Props = {
  params: {
    postId: string
  }
}

export default async function SinglePage({ params }: Props) {
  const post = await prisma.post.findFirst({
    where: {
      id: params.postId,
    },
    include: {
      votes: true,
      author: true,
    },
  })

  if (!post) {
    return notFound()
  }

  return (
    <div className="flex flex-col items-center justify-between sm:flex-row sm:items-start">
      <Suspense fallback={<PostVoteShell />}>
        <PostVoteServer postId={post.id} post={post} />
      </Suspense>

      <div className="w-full flex-1 rounded-sm bg-white p-4 sm:w-0">
        <p className="mt-1 max-h-40 truncate text-xs text-gray-500">
          Posted by u/{post.author.username} {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
        </p>
        <h1 className="py-2 text-xl font-semibold leading-6 text-gray-900">{post.title}</h1>

        <EditorOutput content={post.content as unknown as OutputData} />
        <Suspense fallback={<Loader2 className="h-5 w-5 animate-spin text-zinc-500" />}>
          <CommentsSection postId={post.id} />
        </Suspense>
      </div>
    </div>
  )
}

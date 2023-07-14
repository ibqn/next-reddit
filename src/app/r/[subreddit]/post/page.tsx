import { Button } from '@/components/ui/button'
import { UsePostForm } from '@/components/use-post-form'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    subreddit: string
  }
}

export default async function PostPage({ params }: Props) {
  const subreddit = await prisma.subreddit.findFirst({
    where: { name: params.subreddit },
  })

  if (!subreddit) {
    return notFound()
  }

  return (
    <div className="flex flex-col items-start gap-6">
      <div className="flex flex-wrap items-baseline border-b border-gray-200 pb-4">
        <h3 className="text-base font-semibold leading-6 text-gray-900">Create Post</h3>
        <p className="ml-2 truncate text-sm text-gray-500">in r/{params.subreddit}</p>
      </div>

      <UsePostForm subredditId={subreddit.id} />

      <div className="flex w-full justify-end">
        <Button type="submit" className="w-full" form="subreddit-post-form">
          Post
        </Button>
      </div>
    </div>
  )
}

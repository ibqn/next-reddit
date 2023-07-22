import { getAuthSession } from '@/lib/auth'
import { ReactNode } from 'react'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { format } from 'date-fns'
import { notFound } from 'next/navigation'
import { FeedButton } from '@/components/feed-button'
import { SubscribeToggle } from '@/components/subscribe-toggle'

type Props = {
  children: ReactNode
  params: { subreddit: string }
}

export default async function SubredditLayout({ children, params }: Props) {
  const { subreddit: name } = params
  const session = await getAuthSession()

  const subreddit = await prisma.subreddit.findFirst({
    where: { name },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
        },
      },
    },
  })

  if (!subreddit) {
    return notFound()
  }

  const memberCount = await prisma.subscription.count({
    where: {
      subreddit: {
        name,
      },
    },
  })

  const isSubscribed =
    session?.user &&
    (await prisma.subscription.findFirst({
      where: { subreddit: { name }, user: { id: session.user.id } },
    }))
      ? true
      : false

  return (
    <div className="container mx-auto max-w-7xl flex-col pt-12">
      <FeedButton />

      <div className="grid grid-cols-1 gap-y-4 py-6 md:grid-cols-3 md:gap-x-4">
        <div className="col-span-2">{children}</div>

        <div className="order-first h-fit overflow-hidden rounded-lg border border-gray-200 md:order-last">
          <div className="px-6 py-4">
            <p className="py-3 font-semibold">About r/{subreddit.name}</p>
          </div>
          <dl className="divide-y divide-gray-100 bg-white px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Created</dt>
              <dd className="text-gray-700">
                <time dateTime={subreddit.createdAt.toDateString()}>{format(subreddit.createdAt, 'MMMM d, yyyy')}</time>
              </dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Members</dt>
              <dd className="flex items-start gap-x-2">
                <div className="text-gray-900">{memberCount}</div>
              </dd>
            </div>
            {subreddit.creatorId === session?.user?.id && (
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">You created this community</dt>
              </div>
            )}

            {subreddit.creatorId !== session?.user?.id && (
              <SubscribeToggle isSubscribed={isSubscribed} subredditId={subreddit.id} subredditName={subreddit.name} />
            )}

            <Link href={`/r/${name}/post`} className={buttonVariants({ className: 'mb-6 w-full', variant: 'outline' })}>
              Create Post
            </Link>
          </dl>
        </div>
      </div>
    </div>
  )
}

import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

type Props = {
  params: {
    subredditId: string
  }
}

export async function POST(req: Request, { params }: Props) {
  const { subredditId } = params
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    // check if subreddit exists
    const subredditExists = await prisma.subreddit.findUnique({
      where: {
        id: subredditId,
      },
    })

    if (!subredditExists) {
      return NextResponse.json({ message: 'Specified subreddit id does not exist' }, { status: 400 })
    }

    // check if user has already subscribed to subreddit
    const subscriptionExists = await prisma.subscription.findFirst({
      where: {
        subredditId,
        userId: session.user.id,
      },
    })

    if (!subscriptionExists) {
      return NextResponse.json({ message: "You've not subscribed to this subreddit yet" }, { status: 400 })
    }

    // unsubscribe user to the associated subreddit id
    const subscription = await prisma.subscription.delete({
      where: {
        userId_subredditId: {
          subredditId,
          userId: session.user.id,
        },
      },
    })

    return NextResponse.json(subscription)
  } catch (error) {
    return NextResponse.json(
      { message: 'Could not unsubscribe from subreddit at this time. Please try later' },
      { status: 500 }
    )
  }
}

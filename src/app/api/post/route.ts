import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { postValidator } from '@/lib/validators'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { subredditId, content, title } = postValidator.parse(body)

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
      return NextResponse.json({ message: "You've not subscribed to this subreddit" }, { status: 400 })
    }

    const post = await prisma.post.create({
      data: {
        subredditId,
        title,
        content,
        authorId: session.user.id,
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.message }, { status: 400 })
    }
    return NextResponse.json({ message: 'Could not create post at this time. Please try later' }, { status: 500 })
  }
}

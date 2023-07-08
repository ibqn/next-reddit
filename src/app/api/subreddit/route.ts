import { NextResponse } from 'next/server'
import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { SubredditValidator } from '@/lib/validators'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { name } = SubredditValidator.parse(body)

    // check if subreddit already exists
    const subredditExists = await prisma.subreddit.findFirst({
      where: {
        name,
      },
    })

    if (subredditExists) {
      return NextResponse.json({ message: 'Subreddit already exists' }, { status: 409 })
    }

    // create subreddit and associate it with the user
    const subreddit = await prisma.subreddit.create({
      data: {
        name,
        creatorId: session.user.id,
      },
    })

    // creator also has to be subscribed
    await prisma.subscription.create({
      data: {
        userId: session.user.id,
        subredditId: subreddit.id,
      },
    })

    return NextResponse.json({ name: subreddit.name })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.message }, { status: 422 })
    }

    return NextResponse.json({ message: 'Could not create subreddit' }, { status: 500 })
  }
}

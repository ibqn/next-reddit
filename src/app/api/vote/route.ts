import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { postVoteValidator } from '@/lib/validators'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()

    const { postId, voteType } = postVoteValidator.parse(body)

    const post = await prisma.post.findUnique({
      where: { id: postId },
    })

    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 })
    }

    const existingVote = await prisma.vote.findFirst({
      where: {
        userId: session.user.id,
        postId,
      },
    })

    if (existingVote) {
      if (existingVote.type === voteType) {
        const deletedVote = await prisma.vote.delete({
          where: {
            userId_postId: {
              postId,
              userId: session.user.id,
            },
          },
        })

        return NextResponse.json({ vote: deletedVote })
      }

      const updatedVote = await prisma.vote.update({
        where: {
          userId_postId: {
            postId,
            userId: session.user.id,
          },
        },
        data: {
          type: voteType,
        },
      })

      return NextResponse.json({ vote: updatedVote })
    }

    const createdVote = await prisma.vote.create({
      data: {
        type: voteType,
        userId: session.user.id,
        postId,
      },
    })

    return NextResponse.json({ vote: createdVote })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.issues.map((issue) => issue.message)
      return NextResponse.json({ messages }, { status: 400 })
    }

    return NextResponse.json({ message: 'Could not vote that post. Please try later' }, { status: 500 })
  }
}

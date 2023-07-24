import { VoteType } from '@prisma/client'
import { z } from 'zod'

export const postVoteValidator = z.object({
  voteType: z.nativeEnum(VoteType, { required_error: 'Vote should be either UP or DOWN' }),
})

export type PostVotePayload = z.infer<typeof postVoteValidator>

export const commentVoteValidator = z.object({
  voteType: z.nativeEnum(VoteType, { required_error: 'Vote should be either UP or DOWN' }),
})

export type CommentVotePayload = z.infer<typeof commentVoteValidator>

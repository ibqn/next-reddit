import { z } from 'zod'

export const subredditValidator = z.object({
  name: z.string().min(3).max(25),
})

export type CreateSubredditPayload = z.infer<typeof subredditValidator>

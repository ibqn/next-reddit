import { z } from 'zod'

export const postValidator = z.object({
  subredditId: z.string().min(1),
  title: z
    .string()
    .min(1, { message: 'Title must be at least 1 characters long' })
    .max(128, { message: 'Title must be at most 128 characters long' }),
  content: z.object({ blocks: z.array(z.any()) }),
})

export type PostPayload = z.infer<typeof postValidator>

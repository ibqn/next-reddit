'use client'

import { ArrowBigDown, ArrowBigUp, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils'
import { VoteType } from '@prisma/client'
import { useLoginToast } from '@/hooks/use-login-toast'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

type Props = {
  postId: string
  currentVote: VoteType | null
  votesCount: number
}

export const PostVoteClient = (props: Props) => {
  const router = useRouter()
  const { loginToast } = useLoginToast()
  const { toast } = useToast()

  const { votesCount, currentVote } = props

  const [isLoading, startTransition] = useTransition()

  const { mutate: vote } = useMutation({
    mutationFn: (voteType: VoteType) => axios.post(`/api/post/${props.postId}/vote`, { voteType }),
    onError: (error, variables, context) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        loginToast()
      } else if (axios.isAxiosError(error) && error.response?.status === 409) {
        toast({
          title: 'Voting for post error',
          description: error.response?.data?.message,
          variant: 'yellow',
        })
      } else {
        toast({
          title: 'Voting for post error',
          description: 'Your vote was not registered. Please try again.',
          variant: 'destructive',
        })
      }
    },
    onSuccess: (data, variables, context) => {
      startTransition(() => router.refresh())

      toast({
        title: 'Voting for post success',
        description: `Voting was created successfully`,
        variant: 'green',
      })
    },
  })

  return (
    <div className="flex flex-col items-center justify-center gap-4 pb-4 pr-6 sm:w-20 sm:gap-0 sm:pb-0">
      <Button onClick={() => vote(VoteType.UP)} size="sm" variant="ghost" aria-label="up vote">
        <ArrowBigUp
          className={cn('h-5 w-5 text-zinc-700', {
            'fill-emerald-500 text-emerald-500': currentVote === VoteType.UP,
          })}
        />
      </Button>

      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <p className="py-2 text-center text-sm font-medium text-zinc-900">{votesCount}</p>
      )}

      <Button onClick={() => vote(VoteType.DOWN)} size="sm" variant="ghost" aria-label="down vote">
        <ArrowBigDown
          className={cn('h-5 w-5 text-zinc-700', {
            'fill-red-500 text-red-500': currentVote === VoteType.DOWN,
          })}
        />
      </Button>
    </div>
  )
}

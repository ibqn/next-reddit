'use client'

import { ArrowBigDown, ArrowBigUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils'
import { VoteType } from '@prisma/client'
import { useLoginToast } from '@/hooks/use-login-toast'
import { useState } from 'react'
import { usePrevious } from '@mantine/hooks'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  postId: string
  currentVote: VoteType | null
  votesCount: number
}

export const PostVoteClient = (props: Props) => {
  const { loginToast } = useLoginToast()
  const [votesCount, setVotesCount] = useState(props.votesCount)
  const [currentVote, setCurrentVote] = useState(props.currentVote)
  const previousVote = usePrevious(currentVote)

  const { mutate: vote } = useMutation({
    mutationFn: (vote: VoteType) => axios.post(`/api/post/${props.postId}/vote`, { vote }),
  })

  return (
    <div className="flex flex-col justify-center gap-4 pb-4 pr-6 sm:w-20 sm:gap-0 sm:pb-0">
      <Button onClick={() => vote(VoteType.UP)} size="sm" variant="ghost" aria-label="up vote">
        <ArrowBigUp
          className={cn('h-5 w-5 text-zinc-700', {
            'fill-emerald-500 text-emerald-500': currentVote === VoteType.UP,
          })}
        />
      </Button>

      <p className="py-2 text-center text-sm font-medium text-zinc-900">{votesCount}</p>

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

'use client'

import { useMutation } from '@tanstack/react-query'
import { Label } from './ui/label'
import { Switch } from './ui/switch'
import { SwitchProps } from '@radix-ui/react-switch'
import axios from 'axios'
import { useToast } from './ui/use-toast'
import { useCallback, useMemo, useTransition } from 'react'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useLoginToasts } from '@/hooks/use-login-toast'

type Props = {
  isSubscribed: boolean
  subredditId: string
  subredditName: string
} & SwitchProps

export const SubscribeToggle = (props: Props) => {
  const { isSubscribed, subredditId, subredditName } = props

  const router = useRouter()
  const { toast } = useToast()
  const { loginToast } = useLoginToasts()
  const [isPending, startTransition] = useTransition()

  const { mutate: subscribe, isLoading: isSubscribePending } = useMutation({
    mutationFn: () => axios.post(`/api/subreddit/${subredditId}/subscribe`),
    onSuccess: (data, variables, context) => {
      startTransition(() => router.refresh())
      toast({
        title: 'Subscription success',
        description: `Successfully subscribed to ${subredditName}`,
        variant: 'green',
      })
    },
    onError: (error, variables, context) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        loginToast()
      } else {
        toast({
          title: 'Subscription failure',
          description: 'Something went wrong!',
          variant: 'destructive',
        })
      }
    },
  })

  const { mutate: unsubscribe, isLoading: isUnsubscribePending } = useMutation({
    mutationFn: () => axios.post(`/api/subreddit/${subredditId}/unsubscribe`),
    onSuccess: (data, variables, context) => {
      startTransition(() => router.refresh())
      toast({
        title: 'Remove subscription success',
        description: `Successfully unsubscribed from ${subredditName}`,
        variant: 'green',
      })
    },
    onError: (error, variables, context) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        loginToast()
      } else {
        toast({
          title: 'Subscription failure',
          description: 'Something went wrong!',
          variant: 'destructive',
        })
      }
    },
  })

  const toggleSubscription = useCallback(
    () => (isSubscribed ? unsubscribe() : subscribe()),

    [subscribe, unsubscribe, isSubscribed]
  )

  const isLoading = useMemo(
    () => isPending || isSubscribePending || isUnsubscribePending,
    [isPending, isUnsubscribePending, isSubscribePending]
  )

  return (
    <div className="flex items-center justify-center space-x-2 py-3">
      {isLoading ? (
        <Loader2 className="h-6 w-6 animate-spin" />
      ) : (
        <Switch id="subscription-mode" checked={isSubscribed} onCheckedChange={toggleSubscription} />
      )}

      <Label className="cursor-pointer" htmlFor="subscription-mode">
        {isSubscribed ? 'Leave community' : 'Join to Post'}
      </Label>
    </div>
  )
}

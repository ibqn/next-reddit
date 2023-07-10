'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { type CreateSubredditPayload, SubredditValidator } from '@/lib/validators'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'

type Props = {}

export default function CreatePage({}: Props) {
  const router = useRouter()
  const { toast } = useToast()
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSubredditPayload>({ resolver: zodResolver(SubredditValidator) })

  const { mutate: createCommunity, isLoading } = useMutation({
    mutationFn: (payload: CreateSubredditPayload) => axios.post('/api/subreddit', payload),
    onSuccess: (data, variables, context) => {
      reset()
      toast({
        title: 'Create community success',
        description: `The ${variables.name} community was created successfully`,
        variant: 'green',
      })
    },
    onError: (error, variables, context) => {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        toast({
          title: 'Create community error',
          description: 'Community with this name already exists',
          variant: 'destructive',
        })
      } else {
        toast({ title: 'Create community error', description: 'Something went wrong!', variant: 'destructive' })
      }
    },
  })

  const onSubmit = handleSubmit((data) => {
    createCommunity(data)
  })

  return (
    <div className="container mx-auto flex h-full max-w-3xl items-center">
      <form onSubmit={onSubmit} className="relative h-fit w-full space-y-6 rounded-lg bg-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Create a Community</h1>
        </div>

        <hr className="h-px bg-red-500" />

        <div>
          <p className="text-lg font-medium">Name</p>
          <p className="pb-2 text-xs">Community names including capitalization cannot be changed.</p>
          <div className="relative">
            <p className="absolute inset-y-0 left-0 grid w-8 place-items-center text-sm text-zinc-400">r/</p>
            <Input className="pl-6" {...register('name')} />
          </div>
          {errors.name && <div className="mt-2 text-sm text-red-400">{errors.name.message}</div>}
        </div>

        <div className="flex justify-end gap-4">
          <Button disabled={isLoading} variant="subtle" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            Create Community
          </Button>
        </div>
      </form>
    </div>
  )
}

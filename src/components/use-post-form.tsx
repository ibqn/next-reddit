'use client'

import { useEffect, useMemo } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import dynamic from 'next/dynamic'
import { Button } from './ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { type PostPayload, PostValidator } from '@/lib/validators'
import { useToast } from './ui/use-toast'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useLoginToast } from '@/hooks/use-login-toast'
import { usePathname, useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

type Props = {
  subredditId: string
}

export const UsePostForm = ({ subredditId }: Props) => {
  const { toast } = useToast()
  const { loginToast } = useLoginToast()

  const pathname = usePathname()
  const router = useRouter()

  const {
    handleSubmit,
    register,
    setFocus,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PostPayload>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      subredditId,
      title: '',
      content: { blocks: [] },
    },
  })

  const content = watch('content')

  const { mutate: createPost, isLoading } = useMutation({
    mutationFn: (payload: PostPayload) => axios.post('/api/post', payload),
    onSuccess: (data, variables, context) => {
      reset()

      const newPathname = pathname.split('/').slice(0, -1).join('/')
      router.push(newPathname)
      router.refresh()

      toast({
        title: 'Create post success',
        description: `Post was created successfully`,
        variant: 'green',
      })
    },
    onError: (error, variables, context) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        loginToast()
      } else if (axios.isAxiosError(error) && error.response?.status === 409) {
        toast({
          title: 'Create post error',
          description: error.response?.data?.message,
          variant: 'yellow',
        })
      } else {
        toast({ title: 'Create post error', description: 'Something went wrong!', variant: 'destructive' })
      }
    },
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    createPost(data)
  })

  const Editor = useMemo(
    () =>
      dynamic(
        async () => {
          const { Editor } = await import('@/components/editor')
          return Editor
        },
        {
          ssr: false,
          loading: () => <p>loading...</p>,
        }
      ),
    []
  )

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, error] of Object.entries(errors)) {
        error?.message &&
          toast({
            title: 'Create post warnings',
            description: error.message,
            variant: 'yellow',
          })
      }
    }
  }, [errors, toast])

  return (
    <div className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-4">
      <form className="flex flex-col items-start gap-6" onSubmit={onSubmit}>
        <div className="prose prose-stone dark:prose-invert">
          <TextareaAutosize
            {...register('title')}
            placeholder="Title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          />
          <Editor
            onReady={() => setTimeout(() => setFocus('title'))}
            data={content}
            onChange={(value) => setValue('content', value)}
          />
          <p className="text-sm text-gray-500">
            Use <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">Tab</kbd> to open the command menu.
          </p>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-6 w-6 animate-spin" />}
          Post
        </Button>
      </form>
    </div>
  )
}

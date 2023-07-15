'use client'

import { useMemo } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import dynamic from 'next/dynamic'
import { Button } from './ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { PostPayload, PostValidator } from '@/lib/validators'

type Props = {
  subredditId: string
}

export const UsePostForm = ({ subredditId }: Props) => {
  const { handleSubmit, register, setFocus, watch, setValue } = useForm<PostPayload>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      subredditId,
      title: '',
      content: { blocks: [] },
    },
  })

  const content = watch('content')

  const onSubmit = handleSubmit((data) => {
    console.log(data)
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

        <Button type="submit" className="w-full">
          Post
        </Button>
      </form>
    </div>
  )
}

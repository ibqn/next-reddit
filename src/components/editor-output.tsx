'use client'

import { OutputData } from '@editorjs/editorjs'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { ImageRenderer, CodeRenderer } from '@/components/renderers'

type Props = {
  content: OutputData
}

export const EditorOutput = ({ content }: Props) => {
  const Output = useMemo(
    () => dynamic(async () => (await import('editorjs-react-renderer')).default, { ssr: false }),
    []
  )

  const renderers = useMemo(
    () => ({
      code: CodeRenderer,
      image: ImageRenderer,
    }),
    []
  )

  const style = useMemo(
    () => ({
      paragraph: {
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
      },
    }),
    []
  )
  return (
    <div className="prose prose-stone dark:prose-invert">
      <Output style={style} renderers={renderers} data={content} />
    </div>
  )
}

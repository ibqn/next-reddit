'use client'

import EditorJS, { type OutputData } from '@editorjs/editorjs'
import { useEffect, useRef } from 'react'
import { editorTools } from './editor-tools'

type Props = {
  onReady?: () => void
  onChange?: (value: OutputData) => void
  data?: OutputData
}

export const Editor = (props: Props) => {
  const { onReady, data, onChange } = props

  const editorJs = useRef<EditorJS | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && !editorJs.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady: () => onReady?.(),
        async onChange(api, event) {
          const data = await api.saver.save()
          onChange?.(data)
        },
        placeholder: 'Type here to write your post...',
        inlineToolbar: true,
        data,
        tools: editorTools,
      })
      editorJs.current = editor
    }

    return () => {
      editorJs?.current?.destroy()
      editorJs.current = null
    }
  }, [])

  return <div id="editor" className="min-h-[500px]"></div>
}

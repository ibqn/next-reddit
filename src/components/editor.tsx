'use client'

import EditorJS from '@editorjs/editorjs'
import { useEffect, useRef } from 'react'
import { editorTools } from './editor-tools'

type Props = {
  onReady?: () => void
}

export const Editor = (props: Props) => {
  const { onReady } = props

  const editorJs = useRef<EditorJS | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && !editorJs.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady: () => {
          editorJs.current = editor
          onReady?.()
        },
        placeholder: 'Type here to write your post...',
        inlineToolbar: true,
        data: { blocks: [] },
        tools: editorTools,
      })
    }

    return () => {
      editorJs?.current?.destroy()
      editorJs.current = null
    }
  }, [editorJs, onReady])

  return <div id="editor" className="min-h-[500px]"></div>
}

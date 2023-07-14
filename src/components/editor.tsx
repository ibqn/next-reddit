'use client'

import EditorJS from '@editorjs/editorjs'
import { useEffect, useRef, useState } from 'react'
import { editorTools } from './editor-tools'

type Props = {
  onReady?: () => void
}

export const Editor = (props: Props) => {
  const editorJs = useRef<EditorJS>()

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true)
    }
  }, [])

  useEffect(() => {
    if (isMounted && !editorJs.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          editorJs.current = editor
          props?.onReady?.()
        },
        placeholder: 'Type here to write your post...',
        inlineToolbar: true,
        data: { blocks: [] },
        tools: editorTools,
      })
    }

    return () => {
      editorJs.current?.destroy()
      editorJs.current = undefined
    }
  }, [isMounted, props])

  return <div id="editor" className="min-h-[500px]"></div>
}

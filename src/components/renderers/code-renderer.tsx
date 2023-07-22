'use client'

import { Prism } from '@mantine/prism'
import { type Language } from 'prism-react-renderer'
import { useEffect, useMemo } from 'react'

type Props = {
  data: {
    code: string
  }
}

export const CodeRenderer = ({ data: { code } }: Props) => {
  const { language, codeSnippet } = useMemo(() => {
    const [lang, ...body] = code.split('\n')

    const language = lang.slice(1) ?? 'tsx'
    const codeSnippet = body.join('\n')

    return { language, codeSnippet }
  }, [code])

  useEffect(() => {
    async function loadLanguage() {
      if (typeof window !== 'undefined' && language) {
        try {
          await import(`prismjs/components/prism-${language}`)
        } catch (error) {
          console.log('can not find module for lang', language)
        }
      }
    }
    loadLanguage()
  }, [language, code])

  return (
    <Prism language={language as unknown as Language} withLineNumbers>
      {codeSnippet}
    </Prism>
  )
}

'use client'

import { type ReactNode, useEffect, useState } from 'react'

type Props = {
  children: ReactNode
  fallback?: ReactNode
}

export const ClientOnly = ({ children, fallback = null }: Props) => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return fallback
  }

  return children
}

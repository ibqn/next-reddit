'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PersistQueryClientProvider, Persister } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { type ReactNode, useState, useEffect } from 'react'
import { SessionProvider } from 'next-auth/react'

type Props = {
  children: ReactNode
}

export function Providers({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient())
  const [persister, setPersister] = useState<Persister | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPersister(() =>
        createSyncStoragePersister({
          storage: window.localStorage,
        })
      )
    }
  }, [])

  const body = (
    <SessionProvider>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </SessionProvider>
  )

  if (!persister) {
    return <QueryClientProvider client={queryClient}>{body}</QueryClientProvider>
  }

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      {body}
    </PersistQueryClientProvider>
  )
}

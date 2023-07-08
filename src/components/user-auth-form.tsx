'use client'

import { type ComponentProps, useState } from 'react'
import { Button } from './ui/button'
import { Icon } from './icon'
import { useToast } from './ui/use-toast'
import { signIn } from 'next-auth/react'
import { cn } from '@/utils'
import { Loader2 } from 'lucide-react'

type Props = {} & ComponentProps<'div'>

export const UserAuthForm = ({ className, ...props }: Props) => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const loginWithGoogle = async () => {
    setIsLoading(true)

    try {
      await signIn('google')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error logging in with Google',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex justify-center', className)} {...props}>
      <Button disabled={isLoading} type="button" size="sm" className="w-full" onClick={loginWithGoogle}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Icon.google className="mr-2 h-4 w-4" />}
        Google
      </Button>
    </div>
  )
}

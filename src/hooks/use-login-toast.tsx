import { buttonVariants } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import Link from 'next/link'

export const useLoginToasts = () => {
  const loginToast = () => {
    const { dismiss } = toast({
      title: 'Login required.',
      description: 'You need to be logged in to do that.',
      variant: 'destructive',
      action: (
        <Link
          onClick={() => dismiss()}
          href="/sign-in"
          className={buttonVariants({
            variant: 'outline',
            className: 'bg-transparent hover:font-semibold hover:text-destructive',
          })}
        >
          Login
        </Link>
      ),
    })
  }

  return { loginToast }
}

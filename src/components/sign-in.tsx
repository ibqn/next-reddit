import Link from 'next/link'
import { Icon } from './icon'
import { UserAuthForm } from './user-auth-form'

type Props = {}

export const SignIn = (props: Props) => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icon.logo className="mx-auto h-6 w-6" />
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="mx-auto max-w-xs text-sm">
          By continuing, you are setting up a Next Reddit account and agree to our User Agreement and Privacy Policy.
        </p>
      </div>
      <UserAuthForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        New to Next reddit?{' '}
        <Link href="/sign-up" className="hover:text-brand text-sm underline underline-offset-4">
          Sign Up
        </Link>
      </p>
    </div>
  )
}

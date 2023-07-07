import { Icon } from './icon'
import Link from 'next/link'
import { SignInButton } from './sign-in-button'

type Props = {}

export const Navbar = async (props: Props) => {
  return (
    <div className="fixed inset-x-0 top-0 z-[10] h-fit border-b border-zinc-300 bg-zinc-100 py-2">
      <div className="container mx-auto flex h-full max-w-7xl items-center justify-between gap-2">
        <Link href="/" className="flex h-10 items-center gap-2">
          <Icon.logo className="h-8 w-8 sm:h-6 sm:w-6" />
          <p className="hidden text-sm font-medium text-zinc-700 md:block">Next reddit</p>
        </Link>

        {/* search bar */}

        {/* actions */}
        <SignInButton />
      </div>
    </div>
  )
}
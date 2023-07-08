'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

type Props = {}

export default function CreatePage({}: Props) {
  const router = useRouter()

  return (
    <div className="container mx-auto flex h-full max-w-3xl items-center">
      <div className="relative h-fit w-full space-y-6 rounded-lg bg-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Create a Community</h1>
        </div>

        <hr className="h-px bg-red-500" />

        <div>
          <p className="text-lg font-medium">Name</p>
          <p className="pb-2 text-xs">Community names including capitalization cannot be changed.</p>
          <div className="relative">
            <p className="absolute inset-y-0 left-0 grid w-8 place-items-center text-sm text-zinc-400">r/</p>
            <Input className="pl-6" />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            // disabled={isLoading}
            variant="subtle"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
          // isLoading={isLoading}
          // disabled={input.length === 0}
          // onClick={createCommunity}
          >
            Create Community
          </Button>
        </div>
      </div>
    </div>
  )
}

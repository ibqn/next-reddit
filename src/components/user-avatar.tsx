import { type User } from 'next-auth'
import { Avatar, AvatarFallback } from './ui/avatar'
import { AvatarProps } from '@radix-ui/react-avatar'
import Image from 'next/image'
import { Icon } from './icon'

type Props = {
  user: User | null
} & AvatarProps

export const UserAvatar = ({ user, ...props }: Props) => {
  return (
    <Avatar {...props}>
      {user?.image ? (
        <div className="relative aspect-square h-full w-full">
          <Image fill src={user.image} alt="profile picture" referrerPolicy="no-referrer" />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.name ?? 'anonymous'}</span>
          <Icon.user className="h-6 w-6" />
        </AvatarFallback>
      )}
    </Avatar>
  )
}

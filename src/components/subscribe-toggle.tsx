'use client'

import { Label } from './ui/label'
import { Switch } from './ui/switch'
import { SwitchProps } from '@radix-ui/react-switch'

type Props = {
  isSubscribed: boolean
  subredditId: string
  subredditName: string
} & SwitchProps

export const SubscribeToggle = (props: Props) => {
  const { isSubscribed, subredditId, subredditName } = props

  return (
    <div className="flex items-center space-x-2 py-3">
      <Switch id="subscription-mode" checked={isSubscribed} onCheckedChange={() => {}} />
      <Label htmlFor="subscription-mode">{isSubscribed ? 'Leave community' : 'Join to Post'}</Label>
    </div>
  )
}

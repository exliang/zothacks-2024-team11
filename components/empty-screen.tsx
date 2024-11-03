import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          Welcome to your #1 Mood Tracker Tool!
        </h1>
        <p className="mb-1 leading-normal text-muted-foreground">
          Uses ChatGPT's API{' '}
        </p>
      </div>
    </div>
  )
}

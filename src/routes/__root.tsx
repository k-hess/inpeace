import { useEffect } from 'react'
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import appCss from '../styles.css?url'
import { IntakeProvider } from '#/store/intake-context'
import { Header } from '#/components/layout/header'
import { Footer } from '#/components/layout/footer'
import { initAnalytics } from '#/lib/analytics'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'In Peace',
      },
      {
        name: 'description',
        content: 'A calm companion for what happens now.',
      },
      {
        name: 'robots',
        content: 'noindex, nofollow',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  // Client-only, guarded so a PostHog failure never breaks rendering.
  useEffect(() => {
    initAnalytics()
  }, [])

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <IntakeProvider>
          <div className="relative flex min-h-screen flex-col">
            <div className="dawn" aria-hidden />
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
          </div>
        </IntakeProvider>
        <Scripts />
      </body>
    </html>
  )
}

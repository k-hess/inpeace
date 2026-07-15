import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import appCss from '../styles.css?url'
import { IntakeProvider } from '#/store/intake-context'
import { Header } from '#/components/layout/header'
import { Footer } from '#/components/layout/footer'

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
        title: 'Harbor',
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
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <IntakeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </IntakeProvider>
        <Scripts />
      </body>
    </html>
  )
}

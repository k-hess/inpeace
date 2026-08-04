import { createFileRoute } from '@tanstack/react-router'
import { LandingScreen } from '#/components/landing/landing-screen'

export const Route = createFileRoute('/')({
  component: Home,
  ssr: false,
  head: () => ({
    meta: [{ title: 'In Peace' }],
  }),
})

function Home() {
  return <LandingScreen />
}

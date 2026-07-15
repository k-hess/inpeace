import { createFileRoute } from '@tanstack/react-router'
import { IntakeWizard } from '#/components/intake/intake-wizard'

export const Route = createFileRoute('/')({ component: Home, ssr: false })

function Home() {
  return <IntakeWizard />
}

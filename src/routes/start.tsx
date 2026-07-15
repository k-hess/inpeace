import { createFileRoute } from '@tanstack/react-router'
import { IntakeWizard } from '#/components/intake/intake-wizard'

export const Route = createFileRoute('/start')({
  component: Start,
  ssr: false,
  head: () => ({
    meta: [{ title: 'Harbor — Getting started' }],
  }),
})

function Start() {
  return <IntakeWizard />
}

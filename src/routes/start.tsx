import { createFileRoute } from '@tanstack/react-router'
import { ALL_STEP_KEYS, IntakeWizard, type StepKey } from '#/components/intake/intake-wizard'

interface StartSearch {
  step?: StepKey
}

export const Route = createFileRoute('/start')({
  component: Start,
  ssr: false,
  head: () => ({
    meta: [{ title: 'In Peace · Getting started' }],
  }),
  validateSearch: (search: Record<string, unknown>): StartSearch => ({
    step: ALL_STEP_KEYS.includes(search.step as StepKey) ? (search.step as StepKey) : undefined,
  }),
})

function Start() {
  return <IntakeWizard />
}

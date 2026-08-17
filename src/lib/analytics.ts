/**
 * Thin PostHog wrapper. Every call site should be a one-liner through
 * `track()` rather than importing posthog-js directly — that keeps event
 * names centralized-ish and means analytics can be killed in one place
 * (flip ENABLED to false) without touching call sites.
 *
 * Only a public PostHog project key (starts "phc_") belongs here. Never a
 * personal key ("phx_"): those grant account-level access and must not
 * ship in client JS. Left blank until a project key is set, at which point
 * tracking turns on with no other change.
 *
 * No PII is ever sent in event properties.
 */
import posthog from "posthog-js"

const ENABLED = true

const POSTHOG_KEY = ""
const POSTHOG_HOST = "https://us.i.posthog.com"

let initialized = false

/** Call once, client-side only. Safe to call more than once — a no-op after the first. */
export function initAnalytics(): void {
  if (!ENABLED || initialized || typeof window === "undefined") return
  if (!POSTHOG_KEY) return
  initialized = true
  try {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      capture_pageview: true,
      autocapture: false,
      disable_session_recording: true,
      person_profiles: "identified_only",
    })
  } catch {
    // Analytics should never be able to break the app — swallow and move on.
  }
}

/** Fire-and-forget event capture. No-op if init hasn't happened or failed. */
export function track(name: string, props?: Record<string, string | number | boolean>): void {
  if (!ENABLED || !initialized || typeof window === "undefined") return
  try {
    posthog.capture(name, props)
  } catch {
    // Same reasoning as initAnalytics — never let telemetry throw.
  }
}

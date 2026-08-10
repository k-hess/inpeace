/**
 * Thin PostHog wrapper. Every call site should be a one-liner through
 * `track()` rather than importing posthog-js directly — that keeps event
 * names centralized-ish and means analytics can be killed in one place
 * (flip ENABLED to false) without touching call sites.
 *
 * IMPORTANT: only a public project API key (starts "phc_") belongs here —
 * that's the one meant to be embedded in a client bundle. Do NOT put a
 * personal API key (starts "phx_") in this file: those grant broad
 * account-level access and leaking one into shipped JS is a real
 * credential exposure, not just a config mistake. See the build report —
 * ~/.secrets/posthog-parkerstreet.txt currently holds a phx_ personal key,
 * confirmed via a direct capture-endpoint request (401 "API key is not
 * valid: personal_api_key"), so it's deliberately left blank below until
 * the correct phc_ project key is supplied.
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

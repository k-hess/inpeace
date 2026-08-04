import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react"
import { Waves } from "lucide-react"
import { Button } from "#/components/ui/button"

const STORAGE_KEY = "inpeace.gate"
const PASSPHRASE = "driftwood"

/**
 * Full-screen gate that stands in front of the whole app.
 *
 * This is obscurity, not security: the passphrase and the comparison both
 * ship in the client bundle, so anyone who opens devtools can read it in
 * plain text. That's fine — this build only needs to keep the confidential
 * demo URL from being casually stumbled into by someone without the
 * passphrase, not withstand anyone who goes looking for it.
 *
 * Unlocking is remembered in sessionStorage, so a refresh in the same tab
 * session doesn't ask again.
 */
export function PassphraseGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false)
  const [value, setValue] = useState("")
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(STORAGE_KEY) === "true") {
        setUnlocked(true)
      }
    } catch {
      // sessionStorage can be unavailable (private browsing, storage
      // blocked). The gate just asks again — no harm for a demo prop.
    }
  }, [])

  if (unlocked) return <>{children}</>

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (value.trim().toLowerCase() === PASSPHRASE) {
      try {
        window.sessionStorage.setItem(STORAGE_KEY, "true")
      } catch {
        // Unlocking still works for the rest of this render even if it
        // can't persist across a refresh.
      }
      setShowError(false)
      setUnlocked(true)
      return
    }
    setShowError(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-background px-6">
      <div className="dawn" aria-hidden />
      <div className="card-surface rise-in relative w-full max-w-sm rounded-2xl p-8 text-center">
        <div className="mb-6 inline-flex items-center gap-2 font-serif text-lg tracking-[-0.01em] text-foreground">
          <Waves className="h-3.5 w-3.5 text-primary/70" aria-hidden />
          In Peace
        </div>
        <p className="kicker mb-4">Private preview</p>
        <h1 className="display text-2xl text-foreground">A quiet way in.</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          This build is shared by invitation only. Enter the passphrase to continue.
        </p>
        <form onSubmit={handleSubmit} className="mt-7 flex flex-col items-center gap-3">
          <label htmlFor="inpeace-passphrase" className="sr-only">
            Passphrase
          </label>
          <PassphraseInput
            value={value}
            onChange={(next) => {
              setValue(next)
              if (showError) setShowError(false)
            }}
            invalid={showError}
          />
          <p role="alert" aria-live="polite" className="min-h-4 text-xs text-[var(--protect-foreground)]">
            {showError ? "That's not quite it — try again." : null}
          </p>
          <Button type="submit" className="mt-1 w-full rounded-full">
            Continue
          </Button>
        </form>
      </div>
    </div>
  )
}

function PassphraseInput({
  value,
  onChange,
  invalid,
}: {
  value: string
  onChange: (value: string) => void
  invalid: boolean
}) {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    ref.current?.focus()
  }, [])

  return (
    <input
      ref={ref}
      id="inpeace-passphrase"
      name="passphrase"
      type="password"
      autoComplete="off"
      autoCapitalize="off"
      autoCorrect="off"
      spellCheck={false}
      placeholder="Passphrase"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-invalid={invalid}
      className="w-full rounded-md border border-input bg-background px-3 py-2 text-center text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
    />
  )
}

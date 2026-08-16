import { useState } from "react"
import { Lock, Check, Paperclip, Pencil, X } from "lucide-react"
import { cn, formatRelativeTime } from "#/lib/utils"
import type { VaultGroup } from "#/lib/plan-engine"
import { useIntake, type VaultContributor, type VaultEntry } from "#/store/intake-context"
import { accessNote, type InventoryCategoryId } from "#/data/inventory"
import { Button } from "#/components/ui/button"
import { Input } from "#/components/ui/input"
import { Textarea } from "#/components/ui/textarea"

const CONTRIBUTORS: VaultContributor[] = ["You", "Dana", "Sam", "Renee"]

/** Same feel as family-view.tsx's ASSIGNEE_CHIP_COLORS: You gets the accent, everyone else the quieter secondary tone. */
const CONTRIBUTOR_COLORS: Record<VaultContributor, string> = {
  You: "bg-accent text-accent-foreground",
  Dana: "bg-secondary text-secondary-foreground",
  Sam: "bg-secondary text-secondary-foreground",
  Renee: "bg-secondary text-secondary-foreground",
}

function AvatarCircle({ name, className }: { name: VaultContributor; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-medium",
        CONTRIBUTOR_COLORS[name],
        className,
      )}
    >
      {name[0]}
    </span>
  )
}

type Group = VaultGroup
type Item = Group["items"][number]

interface FormState {
  where: string
  detail: string
  files: string[]
  addedBy: VaultContributor
  label: string
}

function emptyForm(): FormState {
  return { where: "", detail: "", files: [], addedBy: "You", label: "" }
}

function formFromEntry(entry: VaultEntry): FormState {
  return { where: entry.where, detail: entry.detail, files: entry.files, addedBy: entry.addedBy, label: entry.label ?? "" }
}

function newCustomId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return `custom-${crypto.randomUUID()}`
  return `custom-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

/** The custom-add draft is keyed separately from real entries since it has no itemId yet. */
function customDraftKey(groupId: string): string {
  return `custom:${groupId}`
}

function labelForEntry(entry: VaultEntry, groups: Group[]): string {
  if (entry.label) return entry.label
  for (const group of groups) {
    const item = group.items.find((candidate) => candidate.id === entry.itemId)
    if (item) return item.label
  }
  return entry.itemId
}

function ContributorPicker({ value, onChange }: { value: VaultContributor; onChange: (next: VaultContributor) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {CONTRIBUTORS.map((name) => (
        <button
          key={name}
          type="button"
          onClick={() => onChange(name)}
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-medium transition",
            value === name
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border/70 bg-secondary/30 text-muted-foreground hover:border-primary/40",
          )}
        >
          {name}
        </button>
      ))}
    </div>
  )
}

function VaultForm({
  form,
  onChange,
  onSave,
  onCancel,
  wherePlaceholder,
  showLabelField,
}: {
  form: FormState
  onChange: (next: FormState) => void
  onSave: () => void
  onCancel: () => void
  wherePlaceholder: string
  showLabelField: boolean
}) {
  return (
    <div className="mt-3 flex flex-col gap-3 rounded-xl border border-border/70 bg-secondary/20 px-4 py-4">
      {showLabelField ? (
        <div>
          <label className="text-xs font-medium text-muted-foreground">What is it</label>
          <Input
            value={form.label}
            onChange={(e) => onChange({ ...form, label: e.target.value })}
            placeholder="e.g. Storage unit gate code"
            className="mt-1"
          />
        </div>
      ) : null}
      <div>
        <label className="text-xs font-medium text-muted-foreground">Where it is</label>
        <Input
          value={form.where}
          onChange={(e) => onChange({ ...form, where: e.target.value })}
          placeholder={wherePlaceholder}
          className="mt-1"
        />
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground">Details</label>
        <Textarea
          value={form.detail}
          onChange={(e) => onChange({ ...form, detail: e.target.value })}
          placeholder="Login, account nickname, combination, anything the family needs"
          className="mt-1"
          rows={2}
        />
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground">Files</label>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-border/70 bg-background px-2.5 py-1.5 text-xs font-medium text-foreground transition hover:border-primary/40">
            <Paperclip className="size-3.5" />
            Attach a file
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) onChange({ ...form, files: [...form.files, file.name] })
                e.target.value = ""
              }}
            />
          </label>
          {form.files.map((file, index) => (
            <span
              key={`${file}-${index}`}
              className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-secondary/40 px-2.5 py-1 text-xs text-muted-foreground"
            >
              {file}
              <button
                type="button"
                onClick={() => onChange({ ...form, files: form.files.filter((_, i) => i !== index) })}
                className="text-muted-foreground/70 transition hover:text-foreground"
                aria-label={`Remove ${file}`}
              >
                <X className="size-3" />
              </button>
            </span>
          ))}
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground">Added by</label>
        <div className="mt-1.5">
          <ContributorPicker value={form.addedBy} onChange={(addedBy) => onChange({ ...form, addedBy })} />
        </div>
      </div>
      <div className="mt-1 flex items-center gap-3">
        <Button type="button" size="sm" onClick={onSave}>
          Save
        </Button>
        <button
          type="button"
          onClick={onCancel}
          className="text-xs text-muted-foreground underline decoration-dashed underline-offset-4 transition hover:text-foreground"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export function VaultSection({ groups, id }: { groups: VaultGroup[]; id: string }) {
  const { progress, updateProgress } = useIntake()
  const entries = progress.vaultEntries
  const [openForms, setOpenForms] = useState<Record<string, FormState>>({})

  if (groups.length === 0) return null

  function openForm(key: string, form: FormState) {
    setOpenForms((prev) => ({ ...prev, [key]: form }))
  }

  function closeForm(key: string) {
    setOpenForms((prev) => {
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  function updateForm(key: string, form: FormState) {
    setOpenForms((prev) => ({ ...prev, [key]: form }))
  }

  function saveKnownItem(item: Item, groupId: InventoryCategoryId) {
    const form = openForms[item.id]
    if (!form) return
    const existing = entries[item.id]
    const entry: VaultEntry = {
      itemId: item.id,
      groupId,
      where: form.where,
      detail: form.detail,
      files: form.files,
      addedBy: form.addedBy,
      addedAt: existing?.addedAt ?? new Date().toISOString(),
    }
    updateProgress((prev) => ({ ...prev, vaultEntries: { ...prev.vaultEntries, [item.id]: entry } }))
    closeForm(item.id)
  }

  function saveExistingCustom(itemId: string, groupId: InventoryCategoryId) {
    const form = openForms[itemId]
    if (!form) return
    const existing = entries[itemId]
    const entry: VaultEntry = {
      itemId,
      groupId,
      label: form.label || "Something else",
      where: form.where,
      detail: form.detail,
      files: form.files,
      addedBy: form.addedBy,
      addedAt: existing?.addedAt ?? new Date().toISOString(),
    }
    updateProgress((prev) => ({ ...prev, vaultEntries: { ...prev.vaultEntries, [itemId]: entry } }))
    closeForm(itemId)
  }

  function saveCustom(groupId: InventoryCategoryId) {
    const key = customDraftKey(groupId)
    const form = openForms[key]
    if (!form) return
    const itemId = newCustomId()
    const entry: VaultEntry = {
      itemId,
      groupId,
      label: form.label || "Something else",
      where: form.where,
      detail: form.detail,
      files: form.files,
      addedBy: form.addedBy,
      addedAt: new Date().toISOString(),
    }
    updateProgress((prev) => ({ ...prev, vaultEntries: { ...prev.vaultEntries, [itemId]: entry } }))
    closeForm(key)
  }

  function editEntry(entry: VaultEntry) {
    openForm(entry.itemId, formFromEntry(entry))
  }

  function removeEntry(itemId: string) {
    updateProgress((prev) => {
      const next = { ...prev.vaultEntries }
      delete next[itemId]
      return { ...prev, vaultEntries: next }
    })
    closeForm(itemId)
  }

  const allEntries = Object.values(entries)
  const contributors = new Set(allEntries.map((entry) => entry.addedBy))
  const recent = [...allEntries].sort((a, b) => b.addedAt.localeCompare(a.addedAt)).slice(0, 3)

  return (
    <section id={id} className="section-anchor mb-16">
      <p className="kicker kicker-rule mb-4">The vault</p>
      <h2 className="display text-2xl leading-snug text-foreground sm:text-3xl">
        Everything your family finds, in one place.
      </h2>
      <p className="mt-5 mb-6 max-w-lg leading-relaxed text-pretty text-muted-foreground">
        Add what you find as you find it, and everyone here sees it. Stays on this device in this prototype.
      </p>

      <div className="protect-card mb-6 px-6 py-5">
        <p className="font-medium">{accessNote.title}</p>
        <p className="mt-1.5 text-sm leading-relaxed opacity-90">{accessNote.body}</p>
      </div>

      <div className="card-surface mb-6 rounded-2xl px-6 py-5">
        <div className="flex items-center gap-2">
          <Lock className="size-4 text-muted-foreground" />
          <p className="text-sm text-foreground">
            <span className="font-medium">{allEntries.length}</span> thing{allEntries.length === 1 ? "" : "s"} stored,{" "}
            <span className="font-medium">{contributors.size}</span> {contributors.size === 1 ? "person" : "people"}{" "}
            adding
          </p>
        </div>
        {recent.length > 0 ? (
          <div className="mt-4 flex flex-col gap-2 border-t border-border/60 pt-4">
            <p className="text-xs font-medium text-muted-foreground">Recent activity</p>
            <ul className="flex flex-col gap-2">
              {recent.map((entry) => (
                <li key={entry.itemId} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <AvatarCircle name={entry.addedBy} />
                  <span>
                    <span className="font-medium text-foreground">{entry.addedBy}</span> added{" "}
                    {labelForEntry(entry, groups).toLowerCase()}, {formatRelativeTime(entry.addedAt)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-4">
        {groups.map((group) => {
          const groupId: InventoryCategoryId = group.id
          const customEntries = allEntries.filter(
            (entry) => entry.groupId === groupId && entry.itemId.startsWith("custom-"),
          )
          const total = group.items.length + customEntries.length
          const stored = group.items.filter((item) => entries[item.id]).length + customEntries.length
          const customKey = customDraftKey(groupId)
          const customForm = openForms[customKey]

          return (
            <div key={group.id} className="card-surface rounded-2xl px-6 py-6">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-medium text-foreground">{group.label}</p>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {stored} of {total} stored
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{group.blurb}</p>

              <ul className="mt-5 flex flex-col gap-2">
                {group.items.map((item) => {
                  const entry = entries[item.id]
                  const form = openForms[item.id]
                  return (
                    <li key={item.id} className="rounded-xl border border-border/70 bg-secondary/30 px-4 py-3">
                      {entry ? (
                        <div>
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-2">
                              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-foreground">{item.label}</span>
                                  {item.easilyMissed ? (
                                    <span className="rounded-full border border-dashed border-border px-2 py-0.5 text-[10px] text-muted-foreground/80">
                                      easy to miss
                                    </span>
                                  ) : null}
                                </div>
                                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{entry.where}</p>
                                {entry.detail ? (
                                  <p className="mt-1 rounded-md bg-background/60 px-2 py-1 font-mono text-xs leading-relaxed text-muted-foreground">
                                    {entry.detail}
                                  </p>
                                ) : null}
                                {entry.files.length > 0 ? (
                                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                                    {entry.files.map((file) => (
                                      <span
                                        key={file}
                                        className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/60 px-2 py-0.5 text-[11px] text-muted-foreground"
                                      >
                                        <Paperclip className="size-3" />
                                        {file}
                                      </span>
                                    ))}
                                  </div>
                                ) : null}
                                <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                                  <AvatarCircle name={entry.addedBy} />
                                  <span>
                                    Added by {entry.addedBy}, {formatRelativeTime(entry.addedAt)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-3">
                              <button
                                type="button"
                                onClick={() => editEntry(entry)}
                                className="inline-flex items-center gap-1 text-xs text-muted-foreground transition hover:text-foreground"
                              >
                                <Pencil className="size-3" />
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => removeEntry(item.id)}
                                className="text-xs text-muted-foreground underline decoration-dashed underline-offset-4 transition hover:text-foreground"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                          {form ? (
                            <VaultForm
                              form={form}
                              onChange={(next) => updateForm(item.id, next)}
                              onSave={() => saveKnownItem(item, groupId)}
                              onCancel={() => closeForm(item.id)}
                              wherePlaceholder={item.whereToLook}
                              showLabelField={false}
                            />
                          ) : null}
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-foreground">{item.label}</span>
                                {item.easilyMissed ? (
                                  <span className="rounded-full border border-dashed border-border px-2 py-0.5 text-[10px] text-muted-foreground/80">
                                    easy to miss
                                  </span>
                                ) : null}
                              </div>
                              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{item.whereToLook}</p>
                            </div>
                            {!form ? (
                              <button
                                type="button"
                                onClick={() => openForm(item.id, emptyForm())}
                                className="shrink-0 text-xs font-medium text-primary underline decoration-dashed underline-offset-4 transition hover:opacity-80"
                              >
                                Add
                              </button>
                            ) : null}
                          </div>
                          {form ? (
                            <VaultForm
                              form={form}
                              onChange={(next) => updateForm(item.id, next)}
                              onSave={() => saveKnownItem(item, groupId)}
                              onCancel={() => closeForm(item.id)}
                              wherePlaceholder={item.whereToLook}
                              showLabelField={false}
                            />
                          ) : null}
                        </div>
                      )}
                    </li>
                  )
                })}

                {customEntries.map((entry) => {
                  const form = openForms[entry.itemId]
                  return (
                    <li key={entry.itemId} className="rounded-xl border border-border/70 bg-secondary/30 px-4 py-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2">
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                          <div>
                            <span className="text-sm text-foreground">{entry.label}</span>
                            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{entry.where}</p>
                            {entry.detail ? (
                              <p className="mt-1 rounded-md bg-background/60 px-2 py-1 font-mono text-xs leading-relaxed text-muted-foreground">
                                {entry.detail}
                              </p>
                            ) : null}
                            {entry.files.length > 0 ? (
                              <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {entry.files.map((file) => (
                                  <span
                                    key={file}
                                    className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/60 px-2 py-0.5 text-[11px] text-muted-foreground"
                                  >
                                    <Paperclip className="size-3" />
                                    {file}
                                  </span>
                                ))}
                              </div>
                            ) : null}
                            <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                              <AvatarCircle name={entry.addedBy} />
                              <span>
                                Added by {entry.addedBy}, {formatRelativeTime(entry.addedAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-3">
                          <button
                            type="button"
                            onClick={() => editEntry(entry)}
                            className="inline-flex items-center gap-1 text-xs text-muted-foreground transition hover:text-foreground"
                          >
                            <Pencil className="size-3" />
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => removeEntry(entry.itemId)}
                            className="text-xs text-muted-foreground underline decoration-dashed underline-offset-4 transition hover:text-foreground"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      {form ? (
                        <VaultForm
                          form={form}
                          onChange={(next) => updateForm(entry.itemId, next)}
                          onSave={() => saveExistingCustom(entry.itemId, groupId)}
                          onCancel={() => closeForm(entry.itemId)}
                          wherePlaceholder="Where it is"
                          showLabelField
                        />
                      ) : null}
                    </li>
                  )
                })}
              </ul>

              {customForm ? (
                <VaultForm
                  form={customForm}
                  onChange={(next) => updateForm(customKey, next)}
                  onSave={() => saveCustom(groupId)}
                  onCancel={() => closeForm(customKey)}
                  wherePlaceholder="Where it is"
                  showLabelField
                />
              ) : (
                <button
                  type="button"
                  onClick={() => openForm(customKey, emptyForm())}
                  className="mt-4 text-xs font-medium text-primary underline decoration-dashed underline-offset-4 transition hover:opacity-80"
                >
                  Add something else
                </button>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

// For the imminent and planning doors — the conversation the group said
// nobody knows how to start. Pure prompts, no logic: this is a script to
// hand someone, not a rule engine.

import type { JourneyMode } from "#/types/intake"

export interface QuestionGroup {
  id: string
  label: string
  blurb: string
  questions: string[]
}

/**
 * How to open a conversation nobody wants to start. Written for the
 * "for-family" door (you're approaching someone else about this). The
 * "for-self" door doesn't need a way in — that conversation is already
 * happening — so it gets its own note about writing the answers down
 * instead of asking them.
 */
export const conversationNote: { title: string; body: string } = {
  title: "This conversation is hard to start — here's one way in",
  body: "Most people find it lands better as \"I want to get my own affairs in order, will you help me think it through?\" than as a conversation about the other person dying. Starting with your own planning makes it a shared task instead of a hard ask, and it usually opens the door to talking about theirs too.",
}

export const conversationNoteSelf: { title: string; body: string } = {
  title: "This isn't about asking anyone — it's about writing it down",
  body: "You already know most of these answers. What makes them useful later is getting them out of your head — written down somewhere your family would think to look, or said out loud to whoever you'd trust with this. Working through it together turns it into a shared task instead of something you're carrying alone.",
}

/** Picks the right conversation note for the door someone came in through. */
export function getConversationNote(mode: Extract<JourneyMode, "for-family" | "for-self">): {
  title: string
  body: string
} {
  return mode === "for-self" ? conversationNoteSelf : conversationNote
}

export const questionGroups: QuestionGroup[] = [
  {
    id: "questions-what-they-want",
    label: "What they want",
    blurb: "The decisions that are much easier to make once, in advance, than under pressure.",
    questions: [
      "Burial or cremation?",
      "Where — which cemetery, or where should ashes go?",
      "Do you want a service, or would you rather skip it?",
      "Who should be told?",
      "Is there anything you'd want said or played?",
    ],
  },
  {
    id: "questions-where-things-are",
    label: "Where things are",
    blurb: "Not the secrets — just the location, so nobody's searching a house room by room.",
    questions: [
      "Where's the will or trust?",
      "Where's the deed?",
      "Where are the insurance policies?",
      "Where's the password manager, and who's the recovery contact?",
      "Is there a safe deposit box, and where's the key?",
    ],
  },
  {
    id: "questions-who-to-call",
    label: "Who to call",
    blurb: "The people who already know pieces of this and can save real time.",
    questions: [
      "Who's your attorney?",
      "Who's your accountant?",
      "Who's your financial advisor?",
      "Who at your employer should know?",
      "Is there a friend who'd want to know first, before anyone else?",
    ],
  },
  {
    id: "questions-practical-nobody-asks",
    label: "The practical ones nobody asks",
    blurb: "Easy to skip, expensive to skip.",
    questions: [
      "Is there a pre-paid funeral or cemetery plot already?",
      "Am I on any of your accounts?",
      "Who else has access to your accounts?",
      "Do you have any debts I don't know about?",
    ],
  },
]

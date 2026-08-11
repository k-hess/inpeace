import type { Religion } from "#/types/intake"

/**
 * Timing expectations only — never a ritual how-to. Practice varies by
 * community, region, and how observant a family is, so everything here is
 * hedged and points back at the actual authority (clergy, burial society)
 * rather than the app.
 */
export function religionTimingNote(religion: Religion): { title: string; body: string } | null {
  switch (religion) {
    case "jewish":
      return {
        title: "Burial traditionally happens quickly",
        body: "Jewish burial traditionally happens quickly, often within about 24 hours, which compresses everything else on this list. Embalming and viewing are typically avoided, and a chevra kadisha (burial society) may handle preparation. Your rabbi or local chevra kadisha will know the specifics for your community.",
      }
    case "muslim":
      return {
        title: "Burial is traditionally as soon as possible",
        body: "Muslim burial is traditionally as soon as possible, often within 24 hours. Ritual washing (ghusl) and shrouding are typically handled by the community or mosque, and cremation is not practiced. Your imam or local mosque will know the specifics for your community.",
      }
    case "hindu":
      return {
        title: "Cremation is typical, usually within a day or two",
        body: "Cremation is typical and often happens within a day or two, though specific rites vary widely by community and region. Your priest or community elders will know what's expected for your family.",
      }
    case "catholic":
      return {
        title: "A vigil, Mass, and burial usually span several days",
        body: "A vigil, funeral Mass, and burial or interment usually span several days. Cremation is permitted, but the church has guidance on how remains are kept. Worth asking about before deciding. Your parish priest will know the specifics for you.",
      }
    case "christian":
      return {
        title: "Timing is usually flexible",
        body: "Timing is usually flexible, commonly within a week. The funeral home and your church will coordinate the details between them.",
      }
    case "none":
    case "unspecified":
      return null
  }
}

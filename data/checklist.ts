export interface ChecklistItem {
  id: string;
  /** Key suffix — used as t(`items.${key}`) within the checklistPage namespace */
  key: string;
  /** Show an "or" divider before this item */
  isOr?: boolean;
}

export interface BasicGroup {
  id: string;
  /** Key suffix — used as t(`groups.${titleKey}`) */
  titleKey: string;
  descriptionKey?: string;
  items: ChecklistItem[];
  /** Key suffix for a footnote note below the items — t(`groups.${footnoteKey}`) */
  footnoteKey?: string;
}

export interface ConditionalSection {
  id: string;
  /** Key suffix — used as t(`conditionalTitles.${titleKey}`) */
  titleKey: string;
  /** Key suffix — used as t(`appliesIfText.${appliesIfKey}`) */
  appliesIfKey: string;
  /** Checkable items in this section (may be empty for note-only sections) */
  items: ChecklistItem[];
  /** Key suffixes for informational notes — t(`notes.${key}`) */
  noteKeys?: string[];
}

// ─── Basic Groups (required for all applicants) ─────────────────────────────

export const basicGroups: BasicGroup[] = [
  {
    id: "passport",
    titleKey: "passport",
    items: [
      { id: "passport-blank", key: "passport-blank" },
      { id: "passport-6months", key: "passport-6months" },
      { id: "passport-12months", key: "passport-12months" },
    ],
  },
  {
    id: "residency",
    titleKey: "residency",
    descriptionKey: "residencyDesc",
    items: [
      { id: "residency-dl", key: "residency-dl" },
      { id: "residency-id", key: "residency-id", isOr: true },
      { id: "residency-bill", key: "residency-bill", isOr: true },
      { id: "residency-bank", key: "residency-bank", isOr: true },
    ],
    footnoteKey: "residencyMinorNote",
  },
  {
    id: "photo",
    titleKey: "photo",
    items: [
      { id: "photo-recent", key: "photo-recent" },
      { id: "photo-specs", key: "photo-specs" },
    ],
  },
];

// ─── Conditional Sections ────────────────────────────────────────────────────

export const conditionalSections: ConditionalSection[] = [
  {
    id: "prev-visa",
    titleKey: "prev-visa",
    appliesIfKey: "prev-visa",
    items: [{ id: "prev-visa-copy", key: "prev-visa-copy" }],
    noteKeys: ["prev-visa-1", "prev-visa-2"],
  },
  {
    id: "prev-passport",
    titleKey: "prev-passport",
    appliesIfKey: "prev-passport",
    items: [{ id: "prev-passport-copy", key: "prev-passport-copy" }],
  },
  {
    id: "naturalization",
    titleKey: "naturalization",
    appliesIfKey: "naturalization",
    items: [
      { id: "naturalization-cert", key: "naturalization-cert" },
      { id: "naturalization-prev-passport", key: "naturalization-prev-passport" },
    ],
  },
  {
    id: "employer-letter",
    titleKey: "employer-letter",
    appliesIfKey: "employer-letter",
    items: [{ id: "employer-letter", key: "employer-letter" }],
  },
  {
    id: "residence-permit",
    titleKey: "residence-permit",
    appliesIfKey: "residence-permit",
    items: [], // No checkboxes — note only
    noteKeys: ["residence-permit"],
  },
  {
    id: "minor",
    titleKey: "minor",
    appliesIfKey: "minor",
    items: [
      { id: "minor-birth", key: "minor-birth" },
      { id: "minor-parents", key: "minor-parents" },
      { id: "minor-custody", key: "minor-custody" },
    ],
  },
  {
    id: "flight",
    titleKey: "flight",
    appliesIfKey: "flight",
    items: [{ id: "flight-itinerary", key: "flight-itinerary" }],
    noteKeys: ["flight"],
  },
  {
    id: "green-card",
    titleKey: "green-card",
    appliesIfKey: "green-card",
    items: [{ id: "green-card", key: "green-card" }],
  },
  {
    id: "orig-chinese-passport",
    titleKey: "orig-chinese-passport",
    appliesIfKey: "orig-chinese-passport",
    items: [{ id: "orig-chinese-passport", key: "orig-chinese-passport" }],
  },
];

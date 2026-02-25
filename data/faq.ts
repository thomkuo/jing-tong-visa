export type FAQCategory =
  | "general"
  | "documents"
  | "fees-timeline"
  | "after-submission";

export interface FAQItem {
  id: string;
  /** Key within the faqPage namespace, e.g. "general.q1" */
  question: string;
  /** Key within the faqPage namespace, e.g. "general.a1" */
  answer: string;
  category: FAQCategory;
}

export const faqItems: FAQItem[] = [
  // ── General ────────────────────────────────────────────────────────────────
  {
    id: "general-1",
    question: "general.q1",
    answer: "general.a1",
    category: "general",
  },
  {
    id: "general-2",
    question: "general.q2",
    answer: "general.a2",
    category: "general",
  },
  {
    id: "general-3",
    question: "general.q3",
    answer: "general.a3",
    category: "general",
  },
  {
    id: "general-4",
    question: "general.q4",
    answer: "general.a4",
    category: "general",
  },
  {
    id: "general-5",
    question: "general.q5",
    answer: "general.a5",
    category: "general",
  },

  // ── Required Documents ─────────────────────────────────────────────────────
  {
    id: "documents-1",
    question: "documents.q1",
    answer: "documents.a1",
    category: "documents",
  },
  {
    id: "documents-2",
    question: "documents.q2",
    answer: "documents.a2",
    category: "documents",
  },
  {
    id: "documents-3",
    question: "documents.q3",
    answer: "documents.a3",
    category: "documents",
  },
  {
    id: "documents-4",
    question: "documents.q4",
    answer: "documents.a4",
    category: "documents",
  },
  {
    id: "documents-5",
    question: "documents.q5",
    answer: "documents.a5",
    category: "documents",
  },

  // ── Fees & Timeline ────────────────────────────────────────────────────────
  {
    id: "fees-1",
    question: "fees-timeline.q1",
    answer: "fees-timeline.a1",
    category: "fees-timeline",
  },
  {
    id: "fees-2",
    question: "fees-timeline.q2",
    answer: "fees-timeline.a2",
    category: "fees-timeline",
  },
  {
    id: "fees-3",
    question: "fees-timeline.q3",
    answer: "fees-timeline.a3",
    category: "fees-timeline",
  },
  {
    id: "fees-4",
    question: "fees-timeline.q4",
    answer: "fees-timeline.a4",
    category: "fees-timeline",
  },

  // ── After Submission ───────────────────────────────────────────────────────
  {
    id: "after-1",
    question: "after-submission.q1",
    answer: "after-submission.a1",
    category: "after-submission",
  },
  {
    id: "after-2",
    question: "after-submission.q2",
    answer: "after-submission.a2",
    category: "after-submission",
  },
  {
    id: "after-3",
    question: "after-submission.q3",
    answer: "after-submission.a3",
    category: "after-submission",
  },
  {
    id: "after-4",
    question: "after-submission.q4",
    answer: "after-submission.a4",
    category: "after-submission",
  },
];

export const FAQ_CATEGORIES: FAQCategory[] = [
  "general",
  "documents",
  "fees-timeline",
  "after-submission",
];

"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { faqItems, FAQ_CATEGORIES, type FAQCategory } from "@/data/faq";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <motion.svg
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.2 }}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="flex-shrink-0 text-muted"
    >
      <path
        d="M3 6l5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

function FAQItem({
  id,
  question,
  answer,
  isOpen,
  onToggle,
}: {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <div
      className={`border-b border-white/10 last:border-b-0 transition-colors duration-150 ${
        isOpen ? "bg-surface-elevated" : ""
      }`}
    >
      <button
        onClick={() => onToggle(id)}
        className="flex items-start justify-between w-full px-5 py-4 text-left gap-4 hover:bg-surface-elevated transition-colors duration-150 rounded-lg"
        aria-expanded={isOpen}
      >
        <span
          className={`text-sm font-medium leading-relaxed transition-colors duration-150 ${
            isOpen ? "text-red-primary" : "text-foreground"
          }`}
        >
          {question}
        </span>
        <ChevronIcon open={isOpen} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-5 pb-5 pt-0">
              <p className="text-sm text-muted leading-relaxed border-l-2 border-red-primary/40 pl-4">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQAccordion() {
  const t = useTranslations("faqPage");
  // Per-category open item: null = all closed
  const [openItems, setOpenItems] = useState<Record<FAQCategory, string | null>>({
    general: null,
    documents: null,
    "fees-timeline": null,
    "after-submission": null,
  });

  // On desktop, open the first item in each category
  useEffect(() => {
    if (window.innerWidth >= 768) {
      const initial: Record<FAQCategory, string | null> = {
        general: null,
        documents: null,
        "fees-timeline": null,
        "after-submission": null,
      };
      FAQ_CATEGORIES.forEach((cat) => {
        const first = faqItems.find((item) => item.category === cat);
        if (first) initial[cat] = first.id;
      });
      setOpenItems(initial);
    }
  }, []);

  const toggleItem = (category: FAQCategory, id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [category]: prev[category] === id ? null : id,
    }));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      {/* Category jump navigation */}
      <nav className="flex flex-wrap gap-2 mb-14" aria-label="FAQ categories">
        <span className="text-sm text-muted self-center mr-1">{t("jumpTo")}</span>
        {FAQ_CATEGORIES.map((cat) => (
          <a
            key={cat}
            href={`#faq-${cat}`}
            className="px-4 py-1.5 text-sm rounded-full bg-surface border border-red-primary/20 text-muted hover:text-foreground hover:border-red-primary/40 transition-colors duration-150"
          >
            {t(`categories.${cat}`)}
          </a>
        ))}
      </nav>

      {/* Category sections */}
      <div className="flex flex-col gap-14">
        {FAQ_CATEGORIES.map((category) => {
          const items = faqItems.filter((item) => item.category === category);

          return (
            <section key={category} id={`faq-${category}`}>
              {/* Category header */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45 }}
                className="flex items-center gap-4 mb-5"
              >
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground whitespace-nowrap">
                  {t(`categories.${category}`)}
                </h2>
                <div className="h-px flex-1 bg-red-primary/20" />
              </motion.div>

              {/* Accordion card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="bg-surface border border-red-primary/20 rounded-2xl overflow-hidden"
              >
                {items.map((item) => (
                  <FAQItem
                    key={item.id}
                    id={item.id}
                    question={t(item.question as Parameters<typeof t>[0])}
                    answer={t(item.answer as Parameters<typeof t>[0])}
                    isOpen={openItems[category] === item.id}
                    onToggle={(id) => toggleItem(category, id)}
                  />
                ))}
              </motion.div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

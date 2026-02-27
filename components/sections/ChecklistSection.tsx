"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  basicGroups,
  conditionalSections,
  type ChecklistItem,
} from "@/data/checklist";

// ─── Sub-components ──────────────────────────────────────────────────────────

function CheckItem({
  item,
  t,
}: {
  item: ChecklistItem;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <li className="flex items-start gap-3 py-1">
      <span className="text-gold mt-0.5 flex-shrink-0">✓</span>
      <span className="text-sm text-muted leading-relaxed">
        {t(`items.${item.key}`)}
      </span>
    </li>
  );
}

function OrSeparator({ label }: { label: string }) {
  return (
    <li className="flex items-center gap-3 my-0.5">
      <div className="h-px flex-1 bg-white/10" />
      <span className="text-xs text-muted uppercase tracking-wider">{label}</span>
      <div className="h-px flex-1 bg-white/10" />
    </li>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function ChecklistSection() {
  const t = useTranslations("checklistPage");
  const locale = useLocale();
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

  const toggleCollapse = (id: string) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">

      {/* Contact banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-red-primary/10 border border-red-primary/30 rounded-xl px-5 py-4 mb-10">
        <p className="text-sm text-foreground">{t("contactBanner")}</p>
        <Link
          href={`/${locale}/contact`}
          className="text-sm font-medium text-red-primary hover:text-red-dark whitespace-nowrap transition-colors"
        >
          {t("contactBannerCta")}
        </Link>
      </div>

      {/* ── BASIC DOCUMENTS ────────────────────────────────────────────── */}
      <section className="mb-14">
        <div className="mb-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
            {t("basicTitle")}
          </h2>
          <p className="text-muted text-sm mt-1">{t("basicSubtitle")}</p>
        </div>

        <div className="flex flex-col gap-6">
          {basicGroups.map((group) => (
            <div
              key={group.id}
              className="bg-surface border border-red-primary/20 rounded-xl p-6"
            >
              <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                {t(`groups.${group.titleKey}`)}
              </h3>
              {group.descriptionKey && (
                <p className="text-xs text-muted mb-4 leading-relaxed">
                  {t(`groups.${group.descriptionKey}`)}
                </p>
              )}

              <ul className="flex flex-col gap-0.5">
                {group.items.map((item) => (
                  <Fragment key={item.id}>
                    {item.isOr && <OrSeparator label={t("orSeparator")} />}
                    <CheckItem item={item} t={t} />
                  </Fragment>
                ))}
              </ul>

              {group.footnoteKey && (
                <p className="mt-4 pt-4 border-t border-white/10 text-xs text-muted leading-relaxed">
                  ⚠️ {t(`groups.${group.footnoteKey}`)}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── CONDITIONAL DOCUMENTS ──────────────────────────────────────── */}
      <section>
        <div className="mb-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
            {t("conditionalTitle")}
          </h2>
          <p className="text-muted text-sm mt-1">{t("conditionalSubtitle")}</p>
        </div>

        <div className="flex flex-col gap-4">
          {conditionalSections.map((section) => {
            const isCollapsed = collapsedSections.has(section.id);

            return (
              <div
                key={section.id}
                className="bg-surface border border-white/10 rounded-xl overflow-hidden"
              >
                {/* Section header */}
                <button
                  onClick={() => toggleCollapse(section.id)}
                  className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left hover:bg-surface-elevated transition-colors duration-150"
                >
                  <div className="flex-1">
                    <h3 className="font-display text-base font-semibold text-foreground">
                      {t(`conditionalTitles.${section.titleKey}`)}
                    </h3>
                    <p className="text-xs text-muted mt-0.5">
                      <span className="font-medium">{t("appliesIf")}</span>{" "}
                      {t(`appliesIfText.${section.appliesIfKey}`)}
                    </p>
                  </div>
                  <span className="text-muted text-sm flex-shrink-0 mt-0.5">
                    {isCollapsed ? "▸" : "▾"}
                  </span>
                </button>

                {/* Collapsible content */}
                <AnimatePresence initial={false}>
                  {!isCollapsed && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="px-5 pb-5">
                        {section.items.length > 0 && (
                          <ul className="flex flex-col gap-0.5 mb-3">
                            {section.items.map((item) => (
                              <CheckItem key={item.id} item={item} t={t} />
                            ))}
                          </ul>
                        )}

                        {section.noteKeys?.map((noteKey) => (
                          <p
                            key={noteKey}
                            className="text-xs text-muted leading-relaxed mt-3 flex items-start gap-2"
                          >
                            <span className="text-gold flex-shrink-0 mt-0.5">ℹ</span>
                            <span>
                              <span className="font-medium">{t("noteLabel")}</span>{" "}
                              {t(`notes.${noteKey}`)}
                            </span>
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

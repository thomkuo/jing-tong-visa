"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  basicGroups,
  conditionalSections,
  type ChecklistItem,
  type ConditionalSection,
} from "@/data/checklist";

// ─── Sub-components ──────────────────────────────────────────────────────────

function CheckItem({
  item,
  checked,
  onToggle,
  t,
}: {
  item: ChecklistItem;
  checked: boolean;
  onToggle: (id: string) => void;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <li className={checked ? "" : "print:hidden"}>
      <label className="flex items-start gap-3 cursor-pointer group py-1">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onToggle(item.id)}
          className="mt-0.5 w-4 h-4 flex-shrink-0 cursor-pointer accent-red-primary"
        />
        <span
          className={`text-sm leading-relaxed transition-colors duration-150 ${
            checked ? "line-through text-muted" : "text-foreground group-hover:text-white"
          }`}
        >
          {t(`items.${item.key}`)}
        </span>
      </label>
    </li>
  );
}

function OrSeparator({ label }: { label: string }) {
  return (
    <li className="flex items-center gap-3 my-0.5 print:hidden">
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
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleCollapse = (id: string) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const sectionHasChecked = (section: ConditionalSection) =>
    section.items.some((item) => checkedItems.has(item.id));

  const totalItems =
    basicGroups.reduce((a, g) => a + g.items.length, 0) +
    conditionalSections.reduce((a, s) => a + s.items.length, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">

      {/* Print header (screen: hidden; print: visible) */}
      <div className="hidden print:block mb-8 pb-4 border-b border-black">
        <h1 className="text-xl font-bold text-black">{t("printHeader")}</h1>
        <p className="text-sm text-gray-600 mt-1">jingtongvisa.com</p>
      </div>

      {/* Contact banner — print:hidden */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-red-primary/10 border border-red-primary/30 rounded-xl px-5 py-4 mb-10 print:hidden">
        <p className="text-sm text-foreground">{t("contactBanner")}</p>
        <Link
          href={`/${locale}/contact`}
          className="text-sm font-medium text-red-primary hover:text-red-dark whitespace-nowrap transition-colors"
        >
          {t("contactBannerCta")}
        </Link>
      </div>

      {/* Print + progress row */}
      <div className="flex items-center justify-between mb-10 print:hidden">
        <p className="text-sm text-muted">
          <span className="font-semibold text-foreground">{checkedItems.size}</span>{" "}
          {t("progressSuffix", { total: totalItems })}
        </p>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted border border-white/10 hover:border-white/20 hover:text-foreground rounded-lg px-4 py-2 transition-colors"
        >
          🖨 {t("printButton")}
        </button>
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
                    <CheckItem
                      item={item}
                      checked={checkedItems.has(item.id)}
                      onToggle={toggle}
                      t={t}
                    />
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
            const hasChecked = sectionHasChecked(section);

            return (
              <div
                key={section.id}
                className={`bg-surface border rounded-xl overflow-hidden transition-colors duration-200 ${
                  hasChecked
                    ? "border-red-primary/40"
                    : "border-white/10"
                } ${section.items.length === 0 ? "print:hidden" : !hasChecked ? "print:hidden" : ""}`}
              >
                {/* Section header */}
                <button
                  onClick={() => toggleCollapse(section.id)}
                  className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left hover:bg-surface-elevated transition-colors duration-150 print:hidden"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display text-base font-semibold text-foreground">
                        {t(`conditionalTitles.${section.titleKey}`)}
                      </h3>
                      {hasChecked && (
                        <span className="inline-flex items-center gap-1 text-xs text-gold bg-gold/10 border border-gold/20 rounded-full px-2 py-0.5">
                          ✓
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted mt-0.5">
                      <span className="font-medium">{t("appliesIf")}</span>{" "}
                      {t(`appliesIfText.${section.appliesIfKey}`)}
                    </p>
                  </div>
                  <span className="text-muted text-sm flex-shrink-0 mt-0.5">
                    {isCollapsed ? "▸" : "▾"}
                  </span>
                </button>

                {/* Print-only section header */}
                <div className="hidden print:block px-5 pt-4 pb-2">
                  <h3 className="font-bold text-sm text-black">
                    {t(`conditionalTitles.${section.titleKey}`)}
                  </h3>
                </div>

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
                              <CheckItem
                                key={item.id}
                                item={item}
                                checked={checkedItems.has(item.id)}
                                onToggle={toggle}
                                t={t}
                              />
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

                {/* Print-visible items (always shown in print for checked sections) */}
                <div className="hidden print:block px-5 pb-4">
                  <ul className="flex flex-col gap-1">
                    {section.items
                      .filter((item) => checkedItems.has(item.id))
                      .map((item) => (
                        <li key={item.id} className="text-sm text-black flex items-start gap-2">
                          <span>☑</span>
                          <span>{t(`items.${item.key}`)}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

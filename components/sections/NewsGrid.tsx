"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import type { NewsArticleMeta } from "@/lib/mdx";

const ALL_CATEGORIES = [
  "Visa Tips",
  "Policy Updates",
  "Travel",
  "Announcements",
] as const;

function categoryKey(cat: string): string {
  return cat.toLowerCase().replace(/ /g, "-");
}

function formatDate(dateStr: string, locale: string): string {
  return new Date(dateStr).toLocaleDateString(
    locale === "zh" ? "zh-CN" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );
}

export function NewsGrid({ articles }: { articles: NewsArticleMeta[] }) {
  const t = useTranslations("newsPage");
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered =
    activeCategory === "All"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      {/* Category filter bar */}
      <nav className="flex flex-wrap gap-2 mb-12" aria-label="Filter by category">
        <button
          onClick={() => setActiveCategory("All")}
          className={`px-4 py-1.5 text-sm rounded-full border transition-colors duration-150 ${
            activeCategory === "All"
              ? "bg-red-primary border-red-primary text-white"
              : "bg-surface border-red-primary/20 text-muted hover:text-foreground hover:border-red-primary/40"
          }`}
        >
          {t("allCategories")}
        </button>
        {ALL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 text-sm rounded-full border transition-colors duration-150 ${
              activeCategory === cat
                ? "bg-red-primary border-red-primary text-white"
                : "bg-surface border-red-primary/20 text-muted hover:text-foreground hover:border-red-primary/40"
            }`}
          >
            {t(`categories.${categoryKey(cat)}`)}
          </button>
        ))}
      </nav>

      {/* Article grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {filtered.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Link
                href={`/${locale}/news/${article.slug}`}
                className="group bg-surface-elevated border border-red-primary/20 rounded-xl overflow-hidden hover:border-red-primary/50 transition-colors duration-300 flex flex-col h-full"
              >
                {/* Cover image */}
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute top-3 left-3">
                    <Badge variant="muted">{article.category}</Badge>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <h2 className="font-display text-base font-semibold text-foreground leading-snug group-hover:text-red-primary transition-colors duration-200">
                    {article.title}
                  </h2>
                  <p className="text-sm text-muted leading-relaxed flex-1 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-xs text-muted">
                      {formatDate(article.date, locale)}
                    </span>
                    <span className="text-xs text-muted">
                      {t("minRead", { min: article.readTime })}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <p className="col-span-full text-center text-muted py-16">
              {t("noArticles")}
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

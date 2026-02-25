"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AnimateIn } from "@/components/ui/AnimateIn";
import type { NewsArticleMeta } from "@/lib/mdx";

function formatDate(dateStr: string, locale: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function NewsPreview({ articles }: { articles: NewsArticleMeta[] }) {
  const t = useTranslations("newsPreview");
  const locale = useLocale();
  const preview = articles.slice(0, 3);

  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimateIn className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3">
              {t("title")}
            </h2>
            <p className="text-muted text-lg max-w-xl">{t("subtitle")}</p>
          </div>
          <Button
            href={`/${locale}/news`}
            variant="secondary"
            size="sm"
            className="flex-shrink-0"
          >
            {t("viewAll")}
          </Button>
        </AnimateIn>

        {/* News cards — staggered */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {preview.map((item) => (
            <motion.div
              key={item.slug}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
              }}
            >
              <Link
                href={`/${locale}/news/${item.slug}`}
                className="group bg-surface-elevated border border-red-primary/20 rounded-xl overflow-hidden hover:border-red-primary/50 transition-colors duration-300 flex flex-col h-full"
              >
                {/* Cover image — replace with real article photos before launch */}
                <div className="relative h-44 overflow-hidden flex-shrink-0">
                  <Image
                    src={`https://picsum.photos/seed/${item.slug}/600/350`}
                    alt={item.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute top-3 left-3">
                    <Badge variant="muted">{item.category}</Badge>
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-3 flex-1">
                  <h3 className="font-display text-base font-semibold text-foreground leading-snug group-hover:text-red-primary transition-colors duration-200">
                    {item.title}
                  </h3>

                  <p className="text-sm text-muted leading-relaxed flex-1 line-clamp-3">
                    {item.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-xs text-muted">
                      {formatDate(item.date, locale)}
                    </span>
                    <span className="text-xs text-muted">
                      {t("minRead", { min: item.readTime })}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

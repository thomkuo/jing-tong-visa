"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { newsItems } from "@/data/news";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

function formatDate(dateStr: string, locale: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function NewsPreview() {
  const t = useTranslations("newsPreview");
  const locale = useLocale();
  const preview = newsItems.slice(0, 3);

  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
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
        </div>

        {/* News cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {preview.map((item) => (
            <Link
              key={item.slug}
              href={`/${locale}/news/${item.slug}`}
              className="group bg-surface-elevated border border-red-primary/20 rounded-xl overflow-hidden hover:border-red-primary/40 transition-colors duration-200 flex flex-col"
            >
              {/* Placeholder image area */}
              <div className="h-44 bg-gradient-to-br from-red-primary/10 to-surface-elevated flex items-center justify-center flex-shrink-0">
                <span className="text-4xl opacity-30">📰</span>
              </div>

              <div className="p-5 flex flex-col gap-3 flex-1">
                <div className="flex items-center gap-2">
                  <Badge variant="muted">{item.category}</Badge>
                  <span className="text-xs text-muted">
                    {t("minRead", { min: item.readTime })}
                  </span>
                </div>

                <h3 className="font-display text-base font-semibold text-foreground leading-snug group-hover:text-red-primary transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-muted leading-relaxed flex-1 line-clamp-3">
                  {item.excerpt}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <span className="text-xs text-muted">
                    {formatDate(item.date, locale)}
                  </span>
                  <span className="text-xs text-red-primary font-medium group-hover:underline">
                    {t("readMore")} →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

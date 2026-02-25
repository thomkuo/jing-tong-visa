"use client";

import { useTranslations, useLocale } from "next-intl";
import { whyUsFeatures } from "@/data/whyUs";

export function WhyChooseUs() {
  const t = useTranslations("whyUs");
  const locale = useLocale();

  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUsFeatures.map((feature) => (
            <div
              key={feature.id}
              className="bg-surface-elevated border border-red-primary/20 rounded-xl p-6 hover:border-red-primary/40 transition-colors duration-200 group"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-3 group-hover:text-red-primary transition-colors">
                {locale === "zh" ? feature.titleZh : feature.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {locale === "zh"
                  ? feature.descriptionZh
                  : feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

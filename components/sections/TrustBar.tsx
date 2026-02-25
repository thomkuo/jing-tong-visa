"use client";

import { useTranslations } from "next-intl";

export function TrustBar() {
  const t = useTranslations("trustBar");

  const stats = [
    { value: t("visasValue"), label: t("visasLabel") },
    { value: t("experienceValue"), label: t("experienceLabel") },
    { value: t("locationValue"), label: t("locationLabel") },
    { value: t("ratingValue"), label: t("ratingLabel") },
  ];

  return (
    <section className="bg-surface border-y border-red-primary/20 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center gap-1"
            >
              <span className="font-display text-3xl sm:text-4xl font-bold text-red-primary">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-muted uppercase tracking-wider font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

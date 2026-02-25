"use client";

import { useTranslations, useLocale } from "next-intl";
import { services } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function ServicesOverview() {
  const t = useTranslations("services");
  const locale = useLocale();

  const activeService = services.find((s) => s.active);
  const comingSoon = services.filter((s) => !s.active);

  return (
    <section className="bg-bg py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        {/* Featured active service */}
        {activeService && (
          <div className="mb-8">
            <div className="relative bg-surface-elevated border border-red-primary/30 rounded-2xl p-8 lg:p-10 overflow-hidden">
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-primary/5 rounded-full blur-3xl" />

              <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="default">{t("mostPopular")}</Badge>
                    <Badge variant="success">Active</Badge>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
                    {locale === "zh"
                      ? activeService.nameZh
                      : activeService.name}
                  </h3>
                  <p className="text-muted text-base leading-relaxed mb-6 max-w-xl">
                    {locale === "zh"
                      ? activeService.descriptionZh
                      : activeService.description}
                  </p>

                  {/* Requirements */}
                  {activeService.requirements && (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                      {activeService.requirements.map((req, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-muted"
                        >
                          <span className="text-gold mt-0.5">✓</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Button href={`/${locale}/services`} size="md">
                      {t("learnMore")}
                    </Button>
                    <div className="text-sm text-muted">
                      <span className="text-foreground font-medium">
                        {activeService.timeline}
                      </span>{" "}
                      — {t("timeline")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Coming soon services */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {comingSoon.map((service) => (
            <div
              key={service.id}
              className="bg-surface border border-white/10 rounded-xl p-6 opacity-70"
            >
              <div className="mb-3">
                <Badge variant="muted">{t("comingSoon")}</Badge>
              </div>
              <h4 className="font-display text-lg font-semibold text-foreground mb-2">
                {locale === "zh" ? service.nameZh : service.name}
              </h4>
              <p className="text-sm text-muted leading-relaxed">
                {locale === "zh" ? service.descriptionZh : service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

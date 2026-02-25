"use client";

import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function ContactCTA() {
  const t = useTranslations("contactCta");
  const locale = useLocale();

  return (
    <section className="relative bg-red-primary overflow-hidden py-20 lg:py-24">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-dark via-red-primary to-red-primary/80" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-5">
          <Badge variant="gold">{t("badge")}</Badge>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">
          {t("headline")}
        </h2>
        <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          {t("subheadline")}
        </p>
        <Button
          href={`/${locale}/contact`}
          className="bg-white text-red-primary hover:bg-white/90 font-semibold shadow-xl"
          size="lg"
        >
          {t("cta")}
        </Button>
      </div>
    </section>
  );
}

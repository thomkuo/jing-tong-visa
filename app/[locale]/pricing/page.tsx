import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { pricingTiers } from "@/data/pricing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "Visa Service Pricing | Jing Tong Visa — Washington D.C.",
    zh: "签证服务价格 | 精通签证 — 华盛顿特区",
  };
  const descriptions: Record<string, string> = {
    en: "Transparent, no-hidden-fee pricing for China visa services in Washington D.C. Basic from $89, Full Service from $149. Government fees listed separately.",
    zh: "华盛顿特区中国签证服务透明收费，无隐藏费用。基础服务$89起，全程服务$149起，领事馆规费另计。",
  };
  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: `https://jingtongvisa.com/${locale}/pricing`,
      languages: {
        en: "https://jingtongvisa.com/en/pricing",
        zh: "https://jingtongvisa.com/zh/pricing",
        "x-default": "https://jingtongvisa.com/en/pricing",
      },
    },
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      url: `https://jingtongvisa.com/${locale}/pricing`,
      siteName: "Jing Tong Visa Services",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
    },
  };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("pricingPage");

  return (
    <>
      <PageHero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        badge={t("heroBadge")}
        imageSeed="china-pricing-hero"
      />

      {/* ─── Service Fee Note ────────────────────────────────────────── */}
      <section className="bg-bg pt-16 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="bg-surface border border-gold/20 rounded-xl px-6 py-4 flex items-start gap-3 max-w-3xl mx-auto">
              <span className="text-gold text-lg flex-shrink-0 mt-0.5">ℹ</span>
              <p className="text-sm text-muted leading-relaxed">
                {t("serviceFeeNote")}
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ─── Pricing Tiers ───────────────────────────────────────────── */}
      <section className="bg-bg py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {pricingTiers.map((tier, idx) => (
              <AnimateIn key={tier.id} delay={idx * 0.1}>
                <div
                  className={`relative flex flex-col h-full rounded-2xl border p-8 ${
                    tier.recommended
                      ? "bg-surface-elevated border-red-primary/50 shadow-lg shadow-red-primary/10"
                      : "bg-surface border-white/10"
                  }`}
                >
                  {/* Recommended badge */}
                  {tier.recommended && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <Badge variant="default">
                        {locale === "zh" ? tier.badgeZh : tier.badge}
                      </Badge>
                    </div>
                  )}

                  {/* Header */}
                  <div className="mb-6">
                    <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                      {locale === "zh" ? tier.nameZh : tier.name}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {locale === "zh" ? tier.descriptionZh : tier.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 mb-6">
                    <span className="font-display text-5xl font-bold text-foreground">
                      ${tier.price}
                    </span>
                    <span className="text-sm text-muted">{t("perApplication")}</span>
                  </div>

                  {/* Features */}
                  <div className="flex-1 mb-8">
                    <p className="text-xs font-medium text-muted uppercase tracking-wider mb-4">
                      {t("whatsIncluded")}
                    </p>
                    <ul className="flex flex-col gap-3">
                      {tier.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5">
                          <span
                            className={`flex-shrink-0 mt-0.5 text-sm ${
                              feature.included ? "text-gold" : "text-muted/40"
                            }`}
                          >
                            {feature.included ? "✓" : "✗"}
                          </span>
                          <span
                            className={`text-sm ${
                              feature.included ? "text-foreground" : "text-muted/50 line-through"
                            }`}
                          >
                            {locale === "zh" ? feature.textZh : feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    href={`/${locale}/contact`}
                    variant={tier.recommended ? "primary" : "secondary"}
                    className="w-full justify-center"
                  >
                    {t("getStarted")}
                  </Button>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Government Fee Notice ───────────────────────────────────── */}
      <section className="bg-surface py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn className="text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
              {t("govFeeTitle")}
            </h2>
            <p className="text-muted leading-relaxed mb-8">{t("govFeeText")}</p>

            <div className="bg-surface-elevated border border-gold/20 rounded-xl p-6 inline-block mb-8">
              <p className="font-display text-4xl font-bold text-gold mb-1">
                {t("govFeeAmount")}
              </p>
              <p className="text-sm text-muted">{t("govFeeLabel")}</p>
              <p className="text-xs text-muted/60 mt-1">{t("govFeeDisclaimer")}</p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-muted">{t("faqNote")}</p>
              <Link
                href={`/${locale}/faq`}
                className="text-sm text-red-primary hover:text-red-dark font-medium transition-colors"
              >
                {t("faqLink")}
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ─── Consult CTA ────────────────────────────────────────────── */}
      <section className="bg-bg py-12">
        <div className="max-w-xl mx-auto px-4 text-center">
          <AnimateIn>
            <p className="text-muted mb-4">{t("consultNote")}</p>
            <Button href={`/${locale}/contact`} variant="secondary">
              Contact Us for a Free Consultation
            </Button>
          </AnimateIn>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { pricing } from "@/data/pricing";

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
    en: "All-inclusive China visa service pricing in Washington D.C. $250/person for 1–3 applicants, $220/person for groups of 4+. Embassy fee included, no hidden charges.",
    zh: "华盛顿特区中国签证全包价格，1–3人每人$250，4人以上团体每人$220。已含大使馆签证费，无隐藏收费。",
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

      <section className="bg-bg py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Two pricing cards ─────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">

            {/* Card 1 — Standard */}
            <AnimateIn delay={0}>
              <div className="bg-surface border border-white/10 rounded-2xl p-8 flex flex-col h-full">
                <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                  {t("standardTitle")}
                </h3>
                <p className="text-sm text-muted mb-6">{t("standardApplicants")}</p>
                <div className="flex items-baseline gap-1.5 mb-8">
                  <span className="font-display text-5xl font-bold text-foreground">
                    ${pricing.standard.price}
                  </span>
                  <span className="text-sm text-muted">{t("perPerson")}</span>
                </div>
                <Button
                  href={`/${locale}/contact`}
                  variant="secondary"
                  className="w-full justify-center mt-auto"
                >
                  {t("getStarted")}
                </Button>
              </div>
            </AnimateIn>

            {/* Card 2 — Group Rate */}
            <AnimateIn delay={0.1}>
              <div className="relative bg-surface-elevated border border-red-primary/50 shadow-lg shadow-red-primary/10 rounded-2xl p-8 flex flex-col h-full">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge variant="default">{t("bestValue")}</Badge>
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                  {t("groupTitle")}
                </h3>
                <p className="text-sm text-muted mb-6">{t("groupApplicants")}</p>
                <div className="flex items-baseline gap-1.5 mb-8">
                  <span className="font-display text-5xl font-bold text-foreground">
                    ${pricing.group.price}
                  </span>
                  <span className="text-sm text-muted">{t("perPerson")}</span>
                </div>
                <Button
                  href={`/${locale}/contact`}
                  variant="primary"
                  className="w-full justify-center mt-auto"
                >
                  {t("getStarted")}
                </Button>
              </div>
            </AnimateIn>

          </div>

          {/* ── What's Included ────────────────────────────── */}
          <AnimateIn>
            <div className="bg-surface border border-white/10 rounded-2xl p-8 mb-6">
              <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                {t("whatsIncluded")}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pricing.includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-gold flex-shrink-0 mt-0.5">✓</span>
                    <span className="text-sm text-foreground">
                      {locale === "zh" ? item.textZh : item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimateIn>

          {/* ── Not Included ───────────────────────────────── */}
          <AnimateIn>
            <div className="bg-surface border border-white/5 rounded-xl px-5 py-4 flex items-start gap-3">
              <span className="text-muted/60 flex-shrink-0 mt-0.5 text-sm">ℹ</span>
              <p className="text-sm text-muted">
                <span className="font-medium text-muted/80">{t("notIncludedLabel")}: </span>
                {locale === "zh" ? pricing.excludes[0].textZh : pricing.excludes[0].text}
              </p>
            </div>
          </AnimateIn>

          {/* ── FAQ link ───────────────────────────────────── */}
          <AnimateIn>
            <div className="text-center mt-10">
              <p className="text-sm text-muted mb-2">{t("faqNote")}</p>
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

      <ContactCTA />
    </>
  );
}

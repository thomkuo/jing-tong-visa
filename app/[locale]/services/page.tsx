import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "China Visa Services | Jing Tong Visa — Washington D.C.",
    zh: "中国签证服务 | 精通签证 — 华盛顿特区",
  };
  const descriptions: Record<string, string> = {
    en: "Full-service China tourist visa processing in Washington D.C. Expert document review, consulate submission, and application tracking. 500+ visas approved.",
    zh: "华盛顿特区全程中国旅游签证服务。专业文件审核、领事馆提交及申请跟踪。已协助500+份签证获批。",
  };
  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: `https://jingtongvisa.com/${locale}/services`,
      languages: {
        en: "https://jingtongvisa.com/en/services",
        zh: "https://jingtongvisa.com/zh/services",
        "x-default": "https://jingtongvisa.com/en/services",
      },
    },
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      url: `https://jingtongvisa.com/${locale}/services`,
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

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("servicesPage");

  const activeService = services.find((s) => s.active)!;
  const comingSoon = services.filter((s) => !s.active);

  const requirements =
    locale === "zh"
      ? (activeService.requirementsZh ?? activeService.requirements ?? [])
      : (activeService.requirements ?? []);

  return (
    <>
      <PageHero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        imageSeed="china-services-hero"
      />

      {/* ─── Tourist Visa Detail ─────────────────────────────────────── */}
      <section className="bg-bg py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn className="flex items-center gap-3 mb-10">
            <Badge variant="success">{t("activeBadge")}</Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              {locale === "zh" ? activeService.nameZh : activeService.name}
            </h2>
          </AnimateIn>

          {/* Asymmetric: image left / overview right */}
          <AnimateIn className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-16">
            {/* Image */}
            <div className="relative h-72 lg:h-96 rounded-2xl overflow-hidden">
              <Image
                src="https://picsum.photos/seed/china-visa-detail/800/600"
                alt="China tourist destination"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 bg-red-primary/8" />
              {/* Timeline badge */}
              <div className="absolute bottom-4 left-4 bg-bg/85 backdrop-blur-sm border border-red-primary/30 rounded-lg px-4 py-2.5">
                <p className="text-xs text-muted uppercase tracking-wider">
                  {t("timelineTitle")}
                </p>
                <p className="text-sm font-semibold text-foreground mt-0.5">
                  {activeService.timeline}
                </p>
              </div>
            </div>

            {/* Overview */}
            <div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {t("overviewTitle")}
              </h3>
              <p className="text-muted leading-relaxed mb-6">
                {t("touristVisa.overviewText")}
              </p>

              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {t("whoTitle")}
              </h3>
              <p className="text-muted leading-relaxed mb-6">
                {t("touristVisa.whoText")}
              </p>

              {/* Timeline note */}
              <div className="bg-surface border border-red-primary/20 rounded-xl p-5">
                <h4 className="font-semibold text-foreground text-sm mb-2">
                  ⏱ {t("timelineTitle")}
                </h4>
                <p className="text-sm text-muted leading-relaxed">
                  {t("timelineText")}
                </p>
              </div>
            </div>
          </AnimateIn>

          {/* Required Documents */}
          <AnimateIn className="mb-16">
            <div className="bg-surface border border-red-primary/20 rounded-2xl p-8 lg:p-10">
              <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                {t("requirementsTitle")}
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-gold mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-sm text-muted">{req}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-white/10">
                <Link
                  href={`/${locale}/checklist`}
                  className="inline-flex items-center gap-2 text-sm text-red-primary hover:text-red-dark font-medium transition-colors"
                >
                  {t("checklistCta")} →
                </Link>
              </div>
            </div>
          </AnimateIn>

          {/* Process Steps */}
          <AnimateIn className="mb-16">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-8">
              {t("processTitle")}
            </h3>
            {activeService.processSteps && (
              <ProcessSteps steps={activeService.processSteps} locale={locale} />
            )}
          </AnimateIn>

          {/* CTA */}
          <AnimateIn className="flex flex-col sm:flex-row items-start gap-4">
            <Button href={`/${locale}/contact`} size="lg">
              {t("applyCta")}
            </Button>
            <Button href={`/${locale}/pricing`} variant="secondary" size="lg">
              {t("viewPricing")}
            </Button>
          </AnimateIn>
        </div>
      </section>

      {/* ─── Coming Soon ─────────────────────────────────────────────── */}
      <section className="bg-surface py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {t("comingSoonTitle")}
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              {t("comingSoonSubtitle")}
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {comingSoon.map((service, idx) => (
              <AnimateIn key={service.id} delay={idx * 0.1}>
                <div className="bg-surface-elevated border border-white/10 rounded-xl p-6 h-full opacity-70">
                  <Badge variant="muted" className="mb-4">
                    Coming Soon
                  </Badge>
                  <h4 className="font-display text-lg font-semibold text-foreground mb-2">
                    {locale === "zh" ? service.nameZh : service.name}
                  </h4>
                  <p className="text-sm text-muted leading-relaxed">
                    {locale === "zh"
                      ? service.descriptionZh
                      : service.description}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}

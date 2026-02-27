import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/PageHero";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { ContactCTA } from "@/components/sections/ContactCTA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "Frequently Asked Questions | Jing Tong Visa — Washington D.C.",
    zh: "常见问题 | 精通签证 — 华盛顿特区",
  };
  const descriptions: Record<string, string> = {
    en: "Answers to common questions about China visa requirements, fees, processing times, and what to expect after submission.",
    zh: "关于中国签证要求、费用、处理时间及提交后注意事项的常见问题解答。",
  };
  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: `https://jingtongvisa.com/${locale}/faq`,
      languages: {
        en: "https://jingtongvisa.com/en/faq",
        zh: "https://jingtongvisa.com/zh/faq",
        "x-default": "https://jingtongvisa.com/en/faq",
      },
    },
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      url: `https://jingtongvisa.com/${locale}/faq`,
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

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("faqPage");

  return (
    <>
      <PageHero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        imageSrc="/images/hongkong.jpg"
      />
      <section className="bg-bg">
        <FAQAccordion />
      </section>
      <ContactCTA />
    </>
  );
}

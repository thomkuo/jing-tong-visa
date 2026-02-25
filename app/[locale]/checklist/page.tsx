import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/PageHero";
import { ChecklistSection } from "@/components/sections/ChecklistSection";
import { ContactCTA } from "@/components/sections/ContactCTA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "Tourist Visa Document Checklist | Jing Tong Visa — Washington D.C.",
    zh: "旅游签证文件清单 | 精通签证 — 华盛顿特区",
  };
  const descriptions: Record<string, string> = {
    en: "Complete document checklist for your China tourist visa application. Interactive, printable, and updated for 2025 requirements.",
    zh: "中国旅游签证申请完整文件清单。可交互、可打印，符合2025年最新要求。",
  };
  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
    },
  };
}

export default async function ChecklistPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("checklistPage");

  return (
    <>
      <PageHero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        badge={t("heroBadge")}
        imageSeed="china-checklist-hero"
      />
      {/* Interactive checklist — client component */}
      <section className="bg-bg">
        <ChecklistSection />
      </section>
      <ContactCTA />
    </>
  );
}

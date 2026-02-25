import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getNewsArticle, getAllNewsArticles, getAllNewsSlugs } from "@/lib/mdx";
import { Badge } from "@/components/ui/Badge";
import { ShareButtons } from "@/components/sections/ShareButtons";

export async function generateStaticParams() {
  const slugs = getAllNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getNewsArticle(slug, locale);
  if (!article) return {};
  return {
    title: `${article.title} | Jing Tong Visa`,
    description: article.excerpt,
    alternates: {
      canonical: `https://jingtongvisa.com/${locale}/news/${slug}`,
      languages: {
        en: `https://jingtongvisa.com/en/news/${slug}`,
        zh: `https://jingtongvisa.com/zh/news/${slug}`,
        "x-default": `https://jingtongvisa.com/en/news/${slug}`,
      },
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.coverImage }],
      url: `https://jingtongvisa.com/${locale}/news/${slug}`,
      siteName: "Jing Tong Visa Services",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.coverImage],
    },
  };
}

function formatDate(dateStr: string, locale: string): string {
  return new Date(dateStr).toLocaleDateString(
    locale === "zh" ? "zh-CN" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getNewsArticle(slug, locale);
  if (!article) notFound();

  const t = await getTranslations("newsPage");

  // Related: same category, excluding current, up to 3
  const allArticles = getAllNewsArticles(locale);
  const related = allArticles
    .filter((a) => a.category === article.category && a.slug !== slug)
    .slice(0, 3);

  const articleUrl = `https://jingtongvisa.com/${locale}/news/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage,
    datePublished: article.date,
    author: { "@type": "Organization", name: article.author },
    publisher: {
      "@type": "Organization",
      name: "Jing Tong Visa Services",
      url: "https://jingtongvisa.com",
    },
    url: articleUrl,
  };

  return (
    <article className="bg-bg min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── Cover image ─────────────────────────────────────────────────── */}
      <div className="relative h-72 sm:h-96 lg:h-[28rem] w-full overflow-hidden">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-red-primary/8" />
      </div>

      {/* ── Article header ──────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="bg-surface border border-red-primary/20 rounded-2xl p-6 sm:p-10 mb-10">
          {/* Back link */}
          <Link
            href={`/${locale}/news`}
            className="inline-flex items-center text-sm text-muted hover:text-foreground transition-colors mb-6"
          >
            {t("backToNews")}
          </Link>

          {/* Category + reading time */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <Badge variant="default">{article.category}</Badge>
            <span className="text-xs text-muted">
              {t("minRead", { min: article.readTime })}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">
            {article.title}
          </h1>

          {/* Author + date */}
          <div className="flex items-center gap-2 text-sm text-muted border-t border-white/10 pt-4">
            <span>{t("by", { author: article.author })}</span>
            <span>·</span>
            <span>{formatDate(article.date, locale)}</span>
          </div>
        </div>

        {/* ── MDX content ──────────────────────────────────────────────── */}
        <div className="article-body mb-12">
          <MDXRemote source={article.content} />
        </div>

        {/* ── Share buttons ─────────────────────────────────────────────── */}
        <div className="border-t border-white/10 pt-8 mb-16">
          <ShareButtons title={article.title} url={articleUrl} />
        </div>

        {/* ── Related articles ──────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="mb-20">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              {t("relatedTitle")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/${locale}/news/${rel.slug}`}
                  className="group bg-surface border border-red-primary/20 rounded-xl overflow-hidden hover:border-red-primary/50 transition-colors duration-300 flex flex-col"
                >
                  <div className="relative h-36 overflow-hidden flex-shrink-0">
                    <Image
                      src={rel.coverImage}
                      alt={rel.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                  </div>
                  <div className="p-4 flex flex-col gap-2 flex-1">
                    <Badge variant="muted">{rel.category}</Badge>
                    <h3 className="font-display text-sm font-semibold text-foreground leading-snug group-hover:text-red-primary transition-colors duration-200 line-clamp-2">
                      {rel.title}
                    </h3>
                    <span className="text-xs text-muted mt-auto">
                      {formatDate(rel.date, locale)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}

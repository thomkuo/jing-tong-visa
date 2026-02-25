import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ARTICLES_DIR = path.join(process.cwd(), "content", "news");

export interface NewsArticleMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  category: string;
  author: string;
  readTime: number;
}

export interface NewsArticle extends NewsArticleMeta {
  content: string;
}

function calcReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function resolveArticlePath(slug: string, locale: string): string {
  if (locale !== "en") {
    const localePath = path.join(ARTICLES_DIR, locale, `${slug}.mdx`);
    if (fs.existsSync(localePath)) return localePath;
  }
  return path.join(ARTICLES_DIR, `${slug}.mdx`);
}

export function getAllNewsSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllNewsArticles(locale = "en"): NewsArticleMeta[] {
  const slugs = getAllNewsSlugs();
  return slugs
    .map((slug): NewsArticleMeta => {
      const filePath = resolveArticlePath(slug, locale);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: (data.title as string) ?? "",
        date: (data.date as string) ?? "",
        excerpt: (data.excerpt as string) ?? "",
        coverImage:
          (data.coverImage as string) ??
          `https://picsum.photos/seed/${slug}/800/450`,
        category: (data.category as string) ?? "General",
        author: (data.author as string) ?? "Jing Tong Team",
        readTime: calcReadTime(content),
      };
    })
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function getNewsArticle(slug: string, locale = "en"): NewsArticle | null {
  const filePath = resolveArticlePath(slug, locale);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: (data.title as string) ?? "",
    date: (data.date as string) ?? "",
    excerpt: (data.excerpt as string) ?? "",
    coverImage:
      (data.coverImage as string) ??
      `https://picsum.photos/seed/${slug}/800/450`,
    category: (data.category as string) ?? "General",
    author: (data.author as string) ?? "Jing Tong Team",
    readTime: calcReadTime(content),
    content,
  };
}

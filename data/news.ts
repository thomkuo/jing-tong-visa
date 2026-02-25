export interface NewsItem {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readTime: number;
}

export const newsItems: NewsItem[] = [
  {
    slug: "china-visa-requirements-2025",
    title: "Updated China Visa Requirements for 2025: What You Need to Know",
    date: "2025-01-15",
    excerpt:
      "China has updated several visa application requirements for 2025. Learn about the new digital photo standards, updated financial documentation thresholds, and streamlined application forms.",
    category: "Policy Updates",
    readTime: 4,
  },
  {
    slug: "tourist-visa-tips-dc",
    title: "5 Tips for a Smooth China Tourist Visa Application in D.C.",
    date: "2024-12-20",
    excerpt:
      "Applying for a China tourist visa from Washington D.C.? Follow these expert tips to avoid common pitfalls and get your visa approved on the first try.",
    category: "Visa Tips",
    readTime: 3,
  },
  {
    slug: "china-travel-guide-2025",
    title: "Planning Your First Trip to China in 2025: A Practical Travel Guide",
    date: "2024-11-30",
    excerpt:
      "From the Great Wall to Shanghai's skyline, China offers extraordinary experiences. Here's everything you need to plan a memorable and hassle-free trip.",
    category: "Travel",
    readTime: 6,
  },
];

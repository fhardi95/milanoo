import { getAllProducts, getCategories, buildCategorySlug, buildProductSlug } from '@/lib/products';
import { SITE_URL } from '@/lib/seo';

export default function sitemap() {
  const now = new Date();
  const entries = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'daily', priority: 1 }
  ];

  for (const c of getCategories()) {
    entries.push({
      url: `${SITE_URL}/category/${c.slug}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8
    });
  }

  for (const p of getAllProducts()) {
    entries.push({
      url: `${SITE_URL}/category/${buildCategorySlug(p.category)}/${buildProductSlug(p)}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6
    });
  }

  return entries;
}

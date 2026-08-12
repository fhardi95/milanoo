import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductCard from '@/components/ProductCard';
import Pagination from '@/components/Pagination';
import CategoryFilters from '@/components/CategoryFilters';
import { getCategories, getCategoryBySlug, queryCategoryProducts } from '@/lib/products';
import { categoryIntro } from '@/lib/copy';
import { SITE_URL } from '@/lib/seo';

export const revalidate = 3600;

export function generateStaticParams() {
  return getCategories().map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params, searchParams }) {
  const category = getCategoryBySlug(params.slug);
  if (!category) return {};

  const hasFilters = Object.keys(searchParams || {}).some((k) => k !== 'page');
  const page = Number(searchParams?.page) || 1;
  const basePath = `/category/${category.slug}`;
  const canonical = hasFilters ? basePath : page > 1 ? `${basePath}?page=${page}` : basePath;

  const title = `${category.name}${page > 1 ? ` — Page ${page}` : ''}`;
  const description = `Shop ${category.count.toLocaleString()} ${category.name.toLowerCase()} pieces at Tavirae. ${categoryIntro(category.name, category.count)}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title: `${title} — Tavirae`, description, url: `${SITE_URL}${canonical}` }
  };
}

export default function CategoryPage({ params, searchParams }) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  const basePath = `/category/${category.slug}`;
  const result = queryCategoryProducts(category.name, searchParams);

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: result.items.map((p, i) => ({
      '@type': 'ListItem',
      position: (result.page - 1) * 24 + i + 1,
      url: `${SITE_URL}/category/${category.slug}/${p.id}`
    }))
  };

  return (
    <>
      <Header activeCategorySlug={category.slug} />
      <Breadcrumbs trail={[{ name: 'Home', href: '/' }, { name: category.name }]} />

      <section className="category-hero">
        <h1>{category.name}</h1>
        <p>{categoryIntro(category.name, category.count)}</p>
      </section>

      <main className="shop">
        <CategoryFilters
          basePath={basePath}
          searchParams={searchParams}
          colors={result.colors}
          sizes={result.sizes}
          activeFilters={result.activeFilters}
        />

        <section className="results">
          <div className="results-toolbar">
            <p className="result-count">{result.total.toLocaleString()} item{result.total === 1 ? '' : 's'}</p>
          </div>

          {result.items.length === 0 ? (
            <div className="empty-state">
              <p>Nothing matches those filters.</p>
              <a className="text-btn" href={basePath}>Clear filters</a>
            </div>
          ) : (
            <div className="product-grid">
              {result.items.map((p) => (
                <ProductCard product={p} key={p.id} />
              ))}
            </div>
          )}

          <Pagination basePath={basePath} searchParams={searchParams} page={result.page} totalPages={result.totalPages} />
        </section>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
    </>
  );
}

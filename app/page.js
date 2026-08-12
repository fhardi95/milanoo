import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroCarousel from '@/components/HeroCarousel';
import CategoryStrip from '@/components/CategoryStrip';
import ProductRail from '@/components/ProductRail';
import TrustBar from '@/components/TrustBar';
import {
  getAllProducts,
  getCategories,
  getTopDiscounts,
  getCategoryPicks,
  getCategoryThumbnail
} from '@/lib/products';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/seo';

export const revalidate = 3600;

export const metadata = {
  title: `${SITE_NAME} — Curated Fashion Catalogue`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: { url: SITE_URL }
};

export default function HomePage() {
  const categories = getCategories();
  const total = getAllProducts().length;
  const onSale = getAllProducts().filter((p) => p.salePrice).length;
  const salePct = Math.round((onSale / total) * 100);

  const heroCategories = categories.slice(0, 3);
  const slides = heroCategories.map((c, i) => ({
    href: `/category/${c.slug}`,
    image: getCategoryThumbnail(c.name),
    eyebrow: i === 0 ? 'The Autumn Edit — No. 026' : `${c.count.toLocaleString()} pieces`,
    title: c.name,
    sub:
      i === 0
        ? `${total.toLocaleString()} pieces across ${categories.length} categories — ${salePct}% currently marked down.`
        : `Shop the full ${c.name.toLowerCase()} rail, filterable by colour, size and price.`,
    cta: `Shop ${c.name}`
  }));

  const categoriesForStrip = categories.map((c) => ({
    ...c,
    image: getCategoryThumbnail(c.name)
  }));

  const topDiscounts = getTopDiscounts(8);
  const railCategories = categories.slice(0, 4);

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: categories.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      url: `${SITE_URL}/category/${c.slug}`
    }))
  };

  return (
    <>
      <Header />

      <h1 className="visually-hidden">Tavirae — curated fashion catalogue, {total.toLocaleString()} pieces</h1>

      <HeroCarousel slides={slides} />
      <CategoryStrip categories={categoriesForStrip} />

      <ProductRail
        id="rail-markdowns"
        title="Today's markdowns"
        subtitle="The steepest discounts in the catalogue right now."
        products={topDiscounts}
        viewAllHref={`/category/${categories[0].slug}?sale=1`}
      />

      {railCategories.map((c) => (
        <ProductRail
          key={c.slug}
          id={`rail-${c.slug}`}
          title={c.name}
          subtitle={`${c.count.toLocaleString()} pieces in this category.`}
          products={getCategoryPicks(c.name, 8)}
          viewAllHref={`/category/${c.slug}`}
        />
      ))}

      <TrustBar />

      <section className="about-copy">
        <h2>About the Tavirae catalogue</h2>
        <p>
          Tavirae indexes {total.toLocaleString()} listings from our retail partner&apos;s live product feed —
          {' '}{categories.map((c) => c.name.toLowerCase()).join(', ')} — so you can search, filter and
          compare across the whole range in one place instead of paging through a single storefront.
          Every price, colour and size shown here reflects the partner feed at last refresh; checkout
          always completes on their site.
        </p>
      </section>

      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
    </>
  );
}

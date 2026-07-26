import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllProducts, getCategories } from '@/lib/products';
import { SITE_DESCRIPTION } from '@/lib/seo';

export const metadata = {
  title: 'MODISTE — Curated Fashion Catalogue',
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' }
};

export default function HomePage() {
  const categories = getCategories();
  const total = getAllProducts().length;
  const onSale = getAllProducts().filter((p) => p.salePrice).length;
  const salePct = Math.round((onSale / total) * 100);

  return (
    <>
      <Header />
      <section className="hero">
        <div className="hero-inner">
          <p className="hero-eyebrow">The Autumn Edit — No. 026</p>
          <h1 className="hero-title">Ten thousand pieces.<br />One catalogue.</h1>
          <p className="hero-sub">
            Occasion dresses, bridal, character costume and lolita silhouettes, pulled into a single
            wardrobe you can actually search. <strong>{salePct}% currently marked down</strong>.
          </p>
          <div className="hero-actions">
            <Link href={`/category/${categories[0].slug}`} className="btn btn-primary">Browse the catalogue</Link>
            <Link href={`/category/${categories[0].slug}?sale=1`} className="btn btn-ghost">Shop the markdowns</Link>
          </div>
        </div>
      </section>

      <section className="category-tiles">
        {categories.map((c) => (
          <Link href={`/category/${c.slug}`} className="category-tile" key={c.slug}>
            <span className="tile-count">{c.count.toLocaleString()} pieces</span>
            <span className="tile-name">{c.name}</span>
            <span className="tile-cta">Shop {c.name.toLowerCase()} →</span>
          </Link>
        ))}
      </section>
      <Footer />
    </>
  );
}

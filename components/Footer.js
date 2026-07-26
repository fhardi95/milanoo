import Link from 'next/link';
import { getCategories } from '@/lib/products';

export default function Footer() {
  const categories = getCategories();

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <span className="brand-mark">M</span>
          <span className="brand-name">MODISTE</span>
          <p>A catalogue, not a warehouse. Every item here ships from and is sold by our retail partner — MODISTE simply helps you find it.</p>
        </div>
        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            {categories.map((c) => (
              <li key={c.slug}><Link href={`/category/${c.slug}`}>{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h4>Catalogue notes</h4>
          <ul>
            <li>Prices and stock refresh from our partner feed and may shift after you leave this page.</li>
            <li>Your bag is held in this browser tab only — nothing is stored or synced.</li>
            <li>Checkout completes on our partner&apos;s site, in their currency and under their policies.</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} MODISTE — a demo storefront built from a live product feed.</span>
      </div>
    </footer>
  );
}

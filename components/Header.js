import Link from 'next/link';
import { getCategories } from '@/lib/products';
import CartButton from './CartButton';

export default function Header({ activeCategorySlug }) {
  const categories = getCategories();

  return (
    <header className="site-header">
      <div className="header-top">
        <Link href="/" className="brand">
          <span className="brand-mark">M</span>
          <span className="brand-name">MODISTE</span>
        </Link>

        <form action="/search" method="get" className="search-wrap" role="search">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5.2" stroke="currentColor" strokeWidth="1.4" />
            <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <input type="text" name="q" placeholder="Search dresses, boots, colours…" autoComplete="off" />
        </form>

        <CartButton />
      </div>

      <nav className="category-nav" aria-label="Categories">
        <Link href="/" className={!activeCategorySlug ? 'active' : ''}>All</Link>
        {categories.map((c) => (
          <Link key={c.slug} href={`/category/${c.slug}`} className={activeCategorySlug === c.slug ? 'active' : ''}>
            {c.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}

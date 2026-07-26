import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Pagination from '@/components/Pagination';
import { getAllProducts, effectivePrice } from '@/lib/products';

export const metadata = {
  title: 'Search',
  robots: { index: false, follow: true } // search results are noindexed to avoid thin/duplicate pages
};

const PAGE_SIZE = 24;

export default function SearchPage({ searchParams }) {
  const q = (searchParams?.q || '').trim().toLowerCase();
  const page = Math.max(1, Number(searchParams?.page) || 1);

  let items = [];
  if (q) {
    items = getAllProducts().filter((p) => {
      const hay = `${p.title} ${p.color} ${p.subCategory} ${p.material}`.toLowerCase();
      return hay.includes(q);
    });
  }

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = items.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <>
      <Header />
      <section className="category-hero">
        <h1>{q ? `Search results for “${q}”` : 'Search'}</h1>
        <p>{q ? `${total.toLocaleString()} item${total === 1 ? '' : 's'} found.` : 'Enter a search term above to browse the catalogue.'}</p>
      </section>
      <main className="shop" style={{ gridTemplateColumns: '1fr' }}>
        <section className="results">
          {q && pageItems.length === 0 && <div className="empty-state"><p>Nothing matches “{q}”.</p></div>}
          <div className="product-grid">
            {pageItems.map((p) => (
              <ProductCard product={p} key={p.id} />
            ))}
          </div>
          <Pagination basePath="/search" searchParams={searchParams} page={safePage} totalPages={totalPages} />
        </section>
      </main>
      <Footer />
    </>
  );
}

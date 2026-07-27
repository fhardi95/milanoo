import Link from 'next/link';
import ProductCard from './ProductCard';

export default function ProductRail({ title, subtitle, products, viewAllHref, id }) {
  if (!products.length) return null;
  return (
    <section className="rail" aria-labelledby={id}>
      <div className="rail-head">
        <div>
          <h2 id={id}>{title}</h2>
          {subtitle && <p className="rail-sub">{subtitle}</p>}
        </div>
        {viewAllHref && <Link href={viewAllHref} className="text-btn">Shop all →</Link>}
      </div>
      <div className="rail-track">
        {products.map((p) => (
          <div className="rail-item" key={p.id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}

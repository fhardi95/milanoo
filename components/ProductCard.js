import Link from 'next/link';
import { buildCategorySlug, buildProductSlug, discountPct, effectivePrice, formatPrice } from '@/lib/products';

export default function ProductCard({ product }) {
  const disc = discountPct(product);
  const href = `/category/${buildCategorySlug(product.category)}/${buildProductSlug(product)}`;

  return (
    <Link href={href} className="card">
      <div className="card-media">
        {disc > 0 && <span className="card-tag">-{Math.round(disc * 100)}%</span>}
        <img src={product.image} alt={product.title} loading="lazy" />
      </div>
      <div className="card-body">
        <span className="card-cat">{product.subCategory || product.category}</span>
        <span className="card-title">{product.title}</span>
        <span className="card-meta">
          {[product.color, product.size].filter(Boolean).join(' · ')}
        </span>
        <div className="card-price-row">
          {product.salePrice ? (
            <>
              <span className="card-price">{formatPrice(effectivePrice(product))}</span>
              <span className="card-price-was">{formatPrice(product.price)}</span>
            </>
          ) : (
            <span className="card-price-only">{formatPrice(effectivePrice(product))}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

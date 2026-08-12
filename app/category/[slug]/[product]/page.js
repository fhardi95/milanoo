import { notFound, permanentRedirect } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductCard from '@/components/ProductCard';
import ProductGallery from '@/components/ProductGallery';
import AddToCartButton from '@/components/AddToCartButton';
import {
  getCategoryBySlug,
  getProductByProductSlug,
  getRelatedProducts,
  buildCategorySlug,
  buildProductSlug,
  discountPct,
  effectivePrice,
  formatPrice
} from '@/lib/products';
import { SITE_URL } from '@/lib/seo';

export const revalidate = 86400; // pages are cached and rebuilt at most once a day
export const dynamicParams = true; // render on first visit rather than at build time

// We deliberately do NOT generateStaticParams for all ~10k products here —
// that would make every deploy rebuild every product page. Pages render
// on-demand on first request and are cached (ISR) after that.

export function generateMetadata({ params }) {
  const product = getProductByProductSlug(params.product);
  if (!product) return {};

  const canonical = `/category/${buildCategorySlug(product.category)}/${buildProductSlug(product)}`;
  const price = effectivePrice(product);
  const title = product.title;
  const description = product.description?.slice(0, 155) || `${product.title} — ${formatPrice(price)} at Tavirae.`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${canonical}`,
      images: product.image ? [{ url: product.image }] : undefined,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      images: product.image ? [product.image] : undefined
    }
  };
}

export default function ProductPage({ params }) {
  const product = getProductByProductSlug(params.product);
  if (!product) notFound();

  const correctCategorySlug = buildCategorySlug(product.category);
  if (params.slug !== correctCategorySlug) {
    // Keep exactly one canonical URL per product so we never split ranking
    // signals across two paths for the same item.
    permanentRedirect(`/category/${correctCategorySlug}/${buildProductSlug(product)}`);
  }

  const category = getCategoryBySlug(correctCategorySlug);
  const disc = discountPct(product);
  const price = effectivePrice(product);
  const related = getRelatedProducts(product, 4);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.images?.length ? product.images : [product.image],
    sku: product.id,
    brand: { '@type': 'Brand', name: 'Milanoo' },
    color: product.color || undefined,
    material: product.material || undefined,
    offers: {
      '@type': 'Offer',
      url: product.link,
      priceCurrency: 'GBP',
      price: price,
      availability:
        product.availability === 'in stock'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition'
    }
  };

  return (
    <>
      <Header activeCategorySlug={category?.slug} />
      <Breadcrumbs
        trail={[
          { name: 'Home', href: '/' },
          { name: product.category, href: `/category/${correctCategorySlug}` },
          { name: product.title }
        ]}
      />

      <main className="product-page">
        <ProductGallery images={product.images?.length ? product.images : [product.image]} alt={product.title} />

        <div className="product-info">
          <span className="product-cat">{product.category}{product.subCategory ? ` · ${product.subCategory}` : ''}</span>
          <h1 className="product-title">{product.title}</h1>

          <div className="product-price-row">
            <span className="product-price">{formatPrice(price)}</span>
            {product.salePrice && (
              <>
                <span className="product-price-was">{formatPrice(product.price)}</span>
                <span className="product-discount">-{Math.round(disc * 100)}%</span>
              </>
            )}
          </div>

          {product.description && <p className="product-desc">{product.description}</p>}

          <div className="product-attrs">
            {product.color && <div className="product-attr"><b>Colour</b>{product.color}</div>}
            {product.size && <div className="product-attr"><b>Size</b>{product.size}</div>}
            {product.material && <div className="product-attr"><b>Material</b>{product.material}</div>}
            {product.pattern && <div className="product-attr"><b>Pattern</b>{product.pattern}</div>}
            <div className="product-attr"><b>Availability</b>{product.availability === 'in stock' ? 'In stock' : product.availability}</div>
            <div className="product-attr"><b>Ref.</b>{product.id}</div>
          </div>

          <div className="product-actions">
            <AddToCartButton product={product} />
            <a className="btn btn-ghost" href={product.link} target="_blank" rel="noopener sponsored">
              View at retailer
            </a>
          </div>
          <p className="product-note">Checkout completes on our partner&apos;s site.</p>
        </div>
      </main>

      {related.length > 0 && (
        <section className="related">
          <h2>You may also like</h2>
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard product={p} key={p.id} />
            ))}
          </div>
        </section>
      )}

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
    </>
  );
}

import raw from '@/data/products.json';
import { buildCategorySlug, buildProductSlug, idFromProductSlug } from './slug';

// Everything here reads a static JSON snapshot of the feed — nothing is
// fetched from or written to a database. `raw` is bundled at build time.

let _all = null;
let _byId = null;
let _categories = null;

function init() {
  if (_all) return;
  _all = raw;
  _byId = new Map(_all.map((p) => [String(p.id), p]));

  const counts = new Map();
  for (const p of _all) {
    counts.set(p.category, (counts.get(p.category) || 0) + 1);
  }
  _categories = [...counts.entries()]
    .map(([name, count]) => ({ name, slug: buildCategorySlug(name), count }))
    .sort((a, b) => b.count - a.count);
}

export function getAllProducts() {
  init();
  return _all;
}

export function getCategories() {
  init();
  return _categories;
}

export function getCategoryBySlug(slug) {
  init();
  return _categories.find((c) => c.slug === slug) || null;
}

export function getProductsByCategory(categoryName) {
  init();
  return _all.filter((p) => p.category === categoryName);
}

export function getProductById(id) {
  init();
  return _byId.get(String(id)) || null;
}

export function getProductByProductSlug(productSlug) {
  init();
  const id = idFromProductSlug(productSlug);
  if (!id) return null;
  return _byId.get(id) || null;
}

export function getTopDiscounts(limit = 8) {
  init();
  return [..._all]
    .filter((p) => p.salePrice)
    .sort((a, b) => discountPct(b) - discountPct(a))
    .slice(0, limit);
}

export function getCategoryPicks(categoryName, limit = 8) {
  init();
  return _all
    .filter((p) => p.category === categoryName && p.image)
    .sort((a, b) => discountPct(b) - discountPct(a))
    .slice(0, limit);
}

export function getCategoryThumbnail(categoryName) {
  init();
  const withImage = _all.find((p) => p.category === categoryName && p.image);
  return withImage ? withImage.image : null;
}

export function getRelatedProducts(product, limit = 4) {
  init();
  return _all
    .filter((p) => p.id !== product.id && p.subCategory === product.subCategory)
    .slice(0, limit);
}

export function discountPct(p) {
  if (!p.salePrice || !p.price) return 0;
  return (p.price - p.salePrice) / p.price;
}

export function effectivePrice(p) {
  return p.salePrice || p.price || 0;
}

export function formatPrice(n) {
  return `£${(n || 0).toFixed(2)}`;
}

export { buildCategorySlug, buildProductSlug };

/**
 * Filter + sort + paginate a category's products from URL search params.
 * Every option here is expressed as a plain query string so results are
 * crawlable and linkable, with no client-side JS required to see them.
 */
export function queryCategoryProducts(categoryName, searchParams, pageSize = 24) {
  let items = getProductsByCategory(categoryName);

  const color = searchParams?.color;
  const size = searchParams?.size;
  const onSale = searchParams?.sale === '1';
  const minPrice = searchParams?.min ? Number(searchParams.min) : null;
  const maxPrice = searchParams?.max ? Number(searchParams.max) : null;
  const sort = searchParams?.sort || 'relevance';
  const page = Math.max(1, Number(searchParams?.page) || 1);

  if (color) items = items.filter((p) => p.color === color);
  if (size) items = items.filter((p) => p.size === size);
  if (onSale) items = items.filter((p) => !!p.salePrice);
  if (minPrice != null) items = items.filter((p) => effectivePrice(p) >= minPrice);
  if (maxPrice != null) items = items.filter((p) => effectivePrice(p) <= maxPrice);

  items = [...items];
  switch (sort) {
    case 'price-asc':
      items.sort((a, b) => effectivePrice(a) - effectivePrice(b));
      break;
    case 'price-desc':
      items.sort((a, b) => effectivePrice(b) - effectivePrice(a));
      break;
    case 'discount':
      items.sort((a, b) => discountPct(b) - discountPct(a));
      break;
    case 'title-asc':
      items.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      break;
  }

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const pageItems = items.slice(start, start + pageSize);

  const colorCounts = new Map();
  const sizeCounts = new Map();
  for (const p of getProductsByCategory(categoryName)) {
    if (p.color) colorCounts.set(p.color, (colorCounts.get(p.color) || 0) + 1);
    if (p.size) sizeCounts.set(p.size, (sizeCounts.get(p.size) || 0) + 1);
  }

  return {
    items: pageItems,
    total,
    page: safePage,
    totalPages,
    colors: [...colorCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 24),
    sizes: [...sizeCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 30),
    activeFilters: { color, size, onSale, minPrice, maxPrice, sort }
  };
}

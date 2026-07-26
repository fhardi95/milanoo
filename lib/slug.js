export function slugify(input) {
  return String(input || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/'/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

// Product URLs end in the numeric id so every slug is guaranteed unique,
// even when two listings share a title (e.g. "Black" / "White" color variants).
export function buildProductSlug(product) {
  const base = slugify(product.title) || 'item';
  return `${base}-${product.id}`;
}

// Pull the trailing numeric id back out of a product URL segment.
export function idFromProductSlug(slug) {
  const match = String(slug || '').match(/-(\d+)$/);
  return match ? match[1] : null;
}

export function buildCategorySlug(category) {
  return slugify(category);
}

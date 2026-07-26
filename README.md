# MODISTE — Next.js storefront

A real multi-page Next.js (App Router) site built from `data/products.json`
(10,355 items). Every category and every product gets its own crawlable,
server-rendered URL with unique `<title>`, meta description, canonical link,
Open Graph tags, and JSON-LD structured data.

Nothing is stored in a database — `data/products.json` is the only data
source, bundled at build time. The cart is React state in the browser tab
only (no localStorage, no cookies, no server writes).

## URL structure

- `/` — home
- `/category/[category-slug]` — e.g. `/category/lolita-fashion`
  - filters via query string: `?color=Burgundy&size=L&sale=1&sort=price-asc&page=2`
- `/category/[category-slug]/[product-slug]` — e.g.
  `/category/lolita-fashion/sweet-lolita-coats-burgundy-ruffles-polyester-overcoat-coat-winter-lolita-outwears-999526`
  (the trailing number is the product's feed ID — it's what makes every
  slug unique even when two listings share a title)
- `/search?q=...` — search (noindexed, so it doesn't dilute the real pages)
- `/sitemap.xml` — every category + every product, auto-generated
- `/robots.txt` — points crawlers at the sitemap

## Local development

```
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment variable (important for SEO)

Set this before building/deploying, or canonical/OG/sitemap URLs will
default to `http://localhost:3000`:

```
NEXT_PUBLIC_SITE_URL=https://your-real-domain.com
```

In Vercel: Project Settings → Environment Variables → add
`NEXT_PUBLIC_SITE_URL` for Production (and Preview, pointed at your
`*.vercel.app` URL if you want previews to have correct tags too).

## Deploying

Push this folder to a GitHub repo and import it into Vercel as you would
any Next.js project — no special build settings needed. Update
`data/products.json` any time your feed refreshes; product/category pages
are cached (ISR, revalidating every 1–24h) so a redeploy or the next
scheduled revalidation picks up new data automatically.

## Notes on the affiliate model

Every listing here is sold and fulfilled by a retail partner (the feed's
`link` field). "Add to bag" only tracks items locally in this tab;
"Continue to retailer" opens each item's real product page in a new tab —
there's no payment flow to build because MODISTE isn't the merchant of
record. Outbound retailer links use `rel="sponsored"` per Google's
guidance for affiliate/paid links.

## Swapping in a different design later

All styling lives in `app/globals.css` as CSS custom properties at the
top (`--ink`, `--wine`, `--brass`, etc.) — change those and the fonts in
`app/layout.js` to reskin without touching component logic.
"# milanoo" 

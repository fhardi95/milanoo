// Set NEXT_PUBLIC_SITE_URL in your Vercel project's Environment Variables
// (e.g. https://modiste.com or your *.vercel.app URL) so canonical/OG/sitemap
// links are always absolute and correct, in every environment.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
export const SITE_NAME = 'MODISTE';
export const SITE_DESCRIPTION =
  'MODISTE is a curated fashion catalogue spanning occasion wear, bridal, costume and lolita silhouettes — searchable in one place, sold by our retail partner.';

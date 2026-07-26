import Link from 'next/link';
import { SITE_URL } from '@/lib/seo';

// trail: [{ name, href }] — last item has no href (current page)
export default function Breadcrumbs({ trail }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.href ? `${SITE_URL}${item.href}` : undefined
    }))
  };

  return (
    <>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        {trail.map((item, i) => (
          <span key={i} style={{ display: 'contents' }}>
            {i > 0 && <span className="sep">/</span>}
            {item.href ? <Link href={item.href}>{item.name}</Link> : <span className="current">{item.name}</span>}
          </span>
        ))}
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

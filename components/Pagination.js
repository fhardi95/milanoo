import Link from 'next/link';

function hrefFor(basePath, searchParams, page) {
  const params = new URLSearchParams();
  Object.entries(searchParams || {}).forEach(([k, v]) => {
    if (k !== 'page' && v) params.set(k, v);
  });
  if (page > 1) params.set('page', String(page));
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

export default function Pagination({ basePath, searchParams, page, totalPages }) {
  if (totalPages <= 1) return null;

  const pages = new Set([1, page - 1, page, page + 1, totalPages].filter((n) => n >= 1 && n <= totalPages));
  const sorted = [...pages].sort((a, b) => a - b);

  let last = 0;
  const items = [];
  sorted.forEach((n) => {
    if (last && n - last > 1) items.push({ ellipsis: true, key: `e-${n}` });
    items.push({ n });
    last = n;
  });

  return (
    <nav className="pagination" aria-label="Pagination">
      <Link
        href={hrefFor(basePath, searchParams, Math.max(1, page - 1))}
        className={`page-btn ${page === 1 ? 'disabled' : ''}`}
        aria-disabled={page === 1}
      >
        &larr;
      </Link>
      {items.map((it) =>
        it.ellipsis ? (
          <span key={it.key} className="page-btn" style={{ border: 'none' }}>&hellip;</span>
        ) : (
          <Link
            key={it.n}
            href={hrefFor(basePath, searchParams, it.n)}
            className={`page-btn ${it.n === page ? 'active' : ''}`}
          >
            {it.n}
          </Link>
        )
      )}
      <Link
        href={hrefFor(basePath, searchParams, Math.min(totalPages, page + 1))}
        className={`page-btn ${page === totalPages ? 'disabled' : ''}`}
        aria-disabled={page === totalPages}
      >
        &rarr;
      </Link>
    </nav>
  );
}

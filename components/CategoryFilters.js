import Link from 'next/link';

function hrefWith(basePath, searchParams, patch) {
  const params = new URLSearchParams();
  Object.entries(searchParams || {}).forEach(([k, v]) => {
    if (v) params.set(k, v);
  });
  Object.entries(patch).forEach(([k, v]) => {
    if (v === null || v === undefined || v === '') params.delete(k);
    else params.set(k, v);
  });
  params.delete('page'); // any filter change resets pagination
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

export default function CategoryFilters({ basePath, searchParams, colors, sizes, activeFilters }) {
  return (
    <aside className="filters">
      <div className="filters-head">
        <h2>Refine</h2>
        <Link href={basePath} className="text-btn">Clear all</Link>
      </div>

      <div className="filter-group">
        <h3>Price &amp; sort</h3>
        <form method="get" action={basePath}>
          {Object.entries(searchParams || {}).map(([k, v]) =>
            ['min', 'max', 'sort', 'sale'].includes(k) || !v ? null : (
              <input key={k} type="hidden" name={k} value={v} />
            )
          )}
          <div className="price-inputs">
            <label>£<input type="number" name="min" min="0" defaultValue={activeFilters.minPrice ?? ''} placeholder="0" /></label>
            <span className="price-sep">—</span>
            <label>£<input type="number" name="max" min="0" defaultValue={activeFilters.maxPrice ?? ''} placeholder="500" /></label>
          </div>
          <label className="checkbox-row">
            <input type="checkbox" name="sale" value="1" defaultChecked={activeFilters.onSale} />
            <span>Marked down only</span>
          </label>
          <div style={{ marginTop: 12 }}>
            <select name="sort" defaultValue={activeFilters.sort || 'relevance'}>
              <option value="relevance">Relevance</option>
              <option value="discount">Biggest discount</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="title-asc">Name: A–Z</option>
            </select>
          </div>
          <button className="btn btn-ghost filter-submit" type="submit">Apply</button>
        </form>
      </div>

      <div className="filter-group">
        <h3>Colour</h3>
        <div className="filter-list">
          {colors.map(([color, count]) => (
            <div className={`filter-item ${activeFilters.color === color ? 'active' : ''}`} key={color}>
              <Link href={hrefWith(basePath, searchParams, { color: activeFilters.color === color ? null : color })}>
                <span>{color}</span>
                <span className="count">{count}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h3>Size</h3>
        <div className="filter-list">
          {sizes.map(([size, count]) => (
            <div className={`filter-item ${activeFilters.size === size ? 'active' : ''}`} key={size}>
              <Link href={hrefWith(basePath, searchParams, { size: activeFilters.size === size ? null : size })}>
                <span>{size}</span>
                <span className="count">{count}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

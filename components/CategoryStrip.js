import Link from 'next/link';

export default function CategoryStrip({ categories }) {
  return (
    <nav className="cat-strip" aria-label="Shop by category">
      {categories.map((c) => (
        <Link href={`/category/${c.slug}`} className="cat-strip-item" key={c.slug}>
          <span className="cat-strip-img" style={{ backgroundImage: `url(${c.image})` }} />
          <span className="cat-strip-name">{c.name}</span>
          <span className="cat-strip-count">{c.count.toLocaleString()}</span>
        </Link>
      ))}
    </nav>
  );
}

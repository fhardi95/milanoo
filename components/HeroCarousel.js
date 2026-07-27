'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HeroCarousel({ slides }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section className="hero-carousel" aria-label="Featured categories">
      {slides.map((s, i) => (
        <Link
          href={s.href}
          key={s.href}
          className={`hero-slide ${i === active ? 'active' : ''}`}
          style={{ backgroundImage: `url(${s.image})` }}
          aria-hidden={i !== active}
          tabIndex={i === active ? 0 : -1}
        >
          <div className="hero-slide-scrim" />
          <div className="hero-slide-copy">
            <p className="hero-eyebrow">{s.eyebrow}</p>
            <h2 className="hero-title">{s.title}</h2>
            <p className="hero-sub">{s.sub}</p>
            <span className="btn btn-primary">{s.cta}</span>
          </div>
        </Link>
      ))}
      <div className="hero-dots">
        {slides.map((s, i) => (
          <button
            key={s.href}
            className={`hero-dot ${i === active ? 'active' : ''}`}
            aria-label={`Show slide ${i + 1}: ${s.title}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';

export default function ProductGallery({ images, alt }) {
  const [active, setActive] = useState(0);
  const list = images && images.length ? images : [];

  return (
    <div className="product-gallery">
      <img src={list[active]} alt={alt} />
      {list.length > 1 && (
        <div className="product-thumbs">
          {list.map((img, i) => (
            <img
              key={img}
              src={img}
              alt=""
              onClick={() => setActive(i)}
              style={{ cursor: 'pointer', outline: i === active ? '2px solid #7A1332' : 'none' }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

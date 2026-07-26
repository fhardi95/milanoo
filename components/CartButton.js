'use client';

import { useCart } from './CartContext';

export default function CartButton() {
  const { count, setOpen } = useCart();
  return (
    <button className="icon-btn cart-toggle" aria-label="Open bag" onClick={() => setOpen(true)}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M5 7h10l-1 10H6L5 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M7.5 7V5.5a2.5 2.5 0 0 1 5 0V7" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <span className="cart-count">{count}</span>
    </button>
  );
}

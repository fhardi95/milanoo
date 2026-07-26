'use client';

import { createContext, useContext, useMemo, useState } from 'react';

// The cart lives only in React state for this browser tab. It is never
// written to localStorage, a cookie, or a server — refreshing the page
// clears it, by design.
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [lines, setLines] = useState([]); // [{ id, qty, product }]
  const [open, setOpen] = useState(false);

  const api = useMemo(() => {
    const addToCart = (product, qty = 1) => {
      setLines((prev) => {
        const existing = prev.find((l) => l.id === product.id);
        if (existing) {
          return prev.map((l) => (l.id === product.id ? { ...l, qty: l.qty + qty } : l));
        }
        return [...prev, { id: product.id, qty, product }];
      });
      setOpen(true);
    };
    const removeFromCart = (id) => setLines((prev) => prev.filter((l) => l.id !== id));
    const changeQty = (id, delta) =>
      setLines((prev) =>
        prev
          .map((l) => (l.id === id ? { ...l, qty: l.qty + delta } : l))
          .filter((l) => l.qty > 0)
      );
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const subtotal = lines.reduce((s, l) => {
      const price = l.product.salePrice || l.product.price || 0;
      return s + price * l.qty;
    }, 0);

    return {
      lines,
      count,
      subtotal,
      open,
      setOpen,
      addToCart,
      removeFromCart,
      changeQty
    };
  }, [lines, open]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}

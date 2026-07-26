'use client';

import { useCart } from './CartContext';
import { formatPrice } from '@/lib/products';

export default function CartDrawer() {
  const { lines, subtotal, open, setOpen, removeFromCart, changeQty } = useCart();

  const checkout = () => {
    lines.forEach((l) => {
      if (l.product.link) window.open(l.product.link, '_blank', 'noopener');
    });
  };

  return (
    <div className={`drawer-backdrop ${open ? 'open' : ''}`} onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
      <aside className="cart-drawer" aria-label="Shopping bag">
        <div className="drawer-head">
          <h2>Your bag</h2>
          <button className="icon-btn" aria-label="Close bag" onClick={() => setOpen(false)}>&times;</button>
        </div>
        <p className="drawer-note">Held in this tab only — closing or refreshing clears it.</p>
        <div className="drawer-items">
          {lines.length === 0 && <p className="drawer-empty">Your bag is empty.</p>}
          {lines.map((l) => (
            <div className="drawer-item" key={l.id}>
              <img src={l.product.image} alt="" />
              <div className="drawer-item-info">
                <span className="drawer-item-title">{l.product.title.slice(0, 60)}</span>
                <span className="drawer-item-meta">
                  {[l.product.color, l.product.size].filter(Boolean).join(' · ')}
                </span>
                <div className="drawer-item-row">
                  <div className="qty-control">
                    <button onClick={() => changeQty(l.id, -1)}>−</button>
                    <span>{l.qty}</span>
                    <button onClick={() => changeQty(l.id, 1)}>+</button>
                  </div>
                  <span className="drawer-item-price">
                    {formatPrice((l.product.salePrice || l.product.price) * l.qty)}
                  </span>
                </div>
                <button className="drawer-item-remove" onClick={() => removeFromCart(l.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="drawer-footer">
          <div className="drawer-total">
            <span>Estimated subtotal</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
          <button className="btn btn-primary btn-block" onClick={checkout} disabled={lines.length === 0}>
            Continue to retailer
          </button>
          <p className="drawer-disclaimer">
            Opens each item at our partner for checkout. Items from different retailers are paid separately.
          </p>
        </div>
      </aside>
    </div>
  );
}

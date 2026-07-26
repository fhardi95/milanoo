'use client';

import { useCart } from './CartContext';

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();
  return (
    <button className="btn btn-primary" onClick={() => addToCart(product)}>
      Add to bag
    </button>
  );
}

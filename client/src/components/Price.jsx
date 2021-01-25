import React, { useContext } from 'react';
import ProductContext from './ProductContext';

export default function Price() {
  const product = useContext(ProductContext);
  const { base, discount, current } = product.price;
  const savings = base - current;

  return (
    <div className="price-container">
      <span className="price-current">{`$${current.toFixed(2)}`}</span>

      <span className="price-original">
        {discount > 0 ? `$${base.toFixed(2)}*` : ''}
      </span>

      <span className="price-savings">
        {discount > 0 ? `Save $${savings.toFixed(2)} (${Math.floor(discount * 100)}%)` : ''}
      </span>
    </div>
  );
}

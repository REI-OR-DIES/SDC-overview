import React, { useContext } from 'react';
import ProductContext from './ProductContext';
import Price from './Price';
import Rating from './Rating';
import OptionsForm from './OptionsForm';

export default function Details() {
  const product = useContext(ProductContext);

  return (
    <div className="details-container">
      <header className="details-heading">
        <h1 className="brand-name">{product.brand_name}</h1>
        <h1 className="product-name">{product.name}</h1>
      </header>

      <div className="details-subheading">
        <Price />
        <div className="details-rating-productid">
          <Rating />
          <span className="details-productid">
            Item #
            {product.product_id}
          </span>
        </div>
      </div>

      <div className="details-body">
        <OptionsForm />
      </div>

      <div className="details-footer">
        <span>GAR 100% Satisfaction Guarantee</span>
        <span>This item ships for free</span>
      </div>
    </div>
  );
}

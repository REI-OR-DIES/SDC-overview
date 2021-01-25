import React, { useContext } from 'react';
import ProductContext from './ProductContext';

export default function Rating() {
  const { rating } = useContext(ProductContext);
  const starsRounded = Math.floor(rating.stars);
  const filled = '★'.repeat(starsRounded);
  const unfilled = '★'.repeat(5 - starsRounded);

  return (
    <div className="rating-container">
      <span className="rating-stars filled">{filled}</span>
      <span className="rating-stars unfilled">{unfilled}</span>
      <span className="rating-average">{rating.stars}</span>
      <span className="rating-count">{`(${rating.count})`}</span>
    </div>
  );
}

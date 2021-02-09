import React, { useContext, useState } from 'react';
import ProductContext from './ProductContext';

/*
  TODO: Render only X images at a time, paginate rest
*/

export default function Slideshow() {
  const product = useContext(ProductContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  const imageList = product.image_url.split(',');
  const allImages = imageList.map((imageUrl, i) => {
    const className = (i === currentIndex)
      ? 'slideshownav-thumbnail-selected'
      : 'slideshownav-thumbnail';

    return (
      <li key={imageUrl} className={className}>
        <input
          type="image"
          className="slideshownav-thumbnail-image"
          src={imageUrl}
          alt={product.name}
          onClick={() => setCurrentIndex(i)}
        />
      </li>
    );
  });

  function page(direction) {
    let next = currentIndex + direction;
    if (next < 0) {
      next = imageList.length - 1;
    } else if (next >= imageList.length) {
      next = 0;
    }
    setCurrentIndex(next);
  }

  return (
    <div className="slideshow-container">
      <img
        className="slideshow-slide"
        src={imageList[currentIndex]}
        alt={product.name}
      />

      <div className="slideshownav-container">
        <button
          className="slideshownav-button"
          type="button"
          onClick={() => page(-1)}
        >
          &lt;
        </button>

        <ul className="slideshownav-thumbnail-list">
          {allImages}
        </ul>

        <button
          className="slideshownav-button"
          type="button"
          onClick={() => page(1)}
        >
          &gt;
        </button>
      </div>

      <div>
        {product.description}
      </div>
    </div>
  );
}

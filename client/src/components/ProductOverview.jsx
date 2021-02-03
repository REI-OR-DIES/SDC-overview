import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slideshow from './Slideshow';
import Details from './Details';
import ProductContext from './ProductContext';

const url = 'http://localhost:3001';

export default function ProductOverview() {
  const [product, setProduct] = useState(null);

  function getProduct() {
    axios.get(`${url}/api/products/random`)
      .then((res) => {
        if (res.data) {
          setProduct(res.data);
        }
      });
  }

  useEffect(() => {
    getProduct();
  }, []);

  if (product === null) {
    return (<div>Loading...</div>);
  }

  return (
    <div className="product-overview-container">
      <ProductContext.Provider value={product}>
        <Slideshow />
        <Details />
      </ProductContext.Provider>
    </div>
  );
}

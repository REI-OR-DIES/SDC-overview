/* eslint-disable no-console */
/* eslint-disable radix */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slideshow from './Slideshow';
import Details from './Details';
import ProductContext from './ProductContext';

const url = 'http://54.215.151.110:3001';

export default function ProductOverview() {
  const [product, setProduct] = useState(null);
  const [id, setId] = useState(1);

  function getProduct() {
    let paramId = parseInt(id) > 0 ? id : 1;
    paramId = parseInt(paramId) < 10000001 ? paramId : 10000000;
    axios.get(`${url}/api/products/id/${paramId}`)
      .then((res) => {
        console.log(res);
        if (res.data) {
          setProduct(res.data[0]);
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
        <div>
          <input
            type="number"
            onKeyPress={(e) => e.charCode >= 48}
            min="1"
            max="10000000"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button type="submit" onClick={getProduct}>
            Select Product By ID
          </button>
        </div>
        <Slideshow />
        <Details />
      </ProductContext.Provider>
    </div>
  );
}

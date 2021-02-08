const express = require('express');
const Product = require('../database/models/Product');

const api = express.Router();

// TODO-MED:
//    Correct status code for error to 500
//    404 if product if product not returned
api.get('/products/all', (req, res) => {
  Product.getAllProducts()
    .then((products) => {
      res.send(products);
    })
    .catch(() => res.status(404).end());
});

// TODO-MED:
//    Correct status code for error to 500
//    404 if product if product not returned
api.get('/products/random', async (req, res) => {
  const product = await Product.getRandomProduct();
  res.send(product);
});

api.get('/products/id/:productId(\\d+)', (req, res) => {
  Product.getProductById(req.params.productId)
    .then((product) => {
      if (product) {
        res.status(200).send(product);
      } else {
        res.status(404).end();
      }
    })
    .catch((e) => {
      console.log(e);
      res.status(500).end();
    });
});

// TODO-LOW-L: api method to POST to cart (require identifying use, saving cart etc)

module.exports = api;

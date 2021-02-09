/* eslint-disable arrow-parens */
const express = require('express');
const db = require('../postgres/db');

const api = express.Router();
// TODO format response body to send back what the front end is looking for (product AND images)

api.get('/products/id/:productId(\\d+)', (req, res) => {
  db.getProductByIdOrRandom(req.params.productId)
    .then((product) => {
      if (product) {
        res.status(200).send(product.rows);
      } else {
        res.status(404).end();
      }
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

// TODO-LOW-L: api method to POST to cart (require identifying use, saving cart etc)

module.exports = api;

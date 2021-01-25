const request = require('supertest');
const express = require('express');
const api = require('../api');

jest.mock('../../database/models/Product');
const Product = require('../../database/models/Product');

const app = express();
app.use('/api', api);

describe('Product API', () => {
  const mockProduct = { product_id: 42 };

  describe('GET /api/products/all', () => {
    it('returns an array of products with a status code of 200', async (done) => {
      const products = [mockProduct];
      Product.getAllProducts.mockResolvedValue(products);

      request(app).get('/api/products/all')
        .expect(200)
        .then((res) => {
          expect(res.body).toBeInstanceOf(Array);
          expect(res.body).toContainEqual(mockProduct);
          done();
        });
    });
  });

  describe('GET /api/products/random', () => {
    it('GET /api/products/random returns a product with a status code of 200', async (done) => {
      Product.getRandomProduct.mockResolvedValue(mockProduct);

      request(app).get('/api/products/random')
        .expect(200)
        .then((res) => {
          expect(res.body).toMatchObject(mockProduct);
          done();
        });
    });
  });

  describe('GET /products/id/:productID', () => {
    it('should return a product with matching productID with status code of 200', async (done) => {
      Product.getProductById.mockImplementation(async (id) => (
        id === mockProduct.product_id.toString() ? mockProduct : null
      ));

      request(app).get(`/api/products/id/${mockProduct.product_id}`)
        .expect(200)
        .then((res) => {
          expect(res.body).toMatchObject(mockProduct);
          done();
        });
    });

    it('should return a 404 status code if matching product is not found', async (done) => {
      Product.getProductById.mockImplementation(async (id) => (
        id === mockProduct.product_id.toString() ? mockProduct : null
      ));

      request(app).get('/api/products/id/0')
        .expect(404)
        .then(() => {
          done();
        });
    });
  });
});

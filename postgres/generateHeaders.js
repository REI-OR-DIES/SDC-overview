const path = require('path');
const { Parser } = require('json2csv');
const fs = require('fs');

const productsHeader = ['brand_name', 'name', 'description', 'price', 'rating', 'options'];
const productFile = path.join(__dirname, 'products.csv');

const productsInCsv = new Parser({ fields: productsHeader }).parse();
fs.appendFileSync(productFile, productsInCsv);
fs.appendFileSync(productFile, '\r\n');

const imagesHeader = ['image_url'];
const imageFile = path.join(__dirname, 'images.csv');

const imagesInCsv = new Parser({ fields: imagesHeader }).parse();
fs.appendFileSync(imageFile, imagesInCsv);
fs.appendFileSync(imageFile, '\r\n');

/* eslint-disable no-plusplus */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* this file is for generating fake data and writing it to the data.csv file */
const faker = require('faker');
const path = require('path');
const { parse } = require('json2csv');
const fs = require('fs');

const randomRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function arrayOfRandomLengthFrom(min, max, f) {
  const rand = randomRange(min, max);
  const temp = new Array(rand).fill(0);
  return temp.map(f);
}

function arrayFromArrayRandom(array, chance = 0.5, mustReturnOne = true) {
  const results = [];

  for (let i = 0; i < array.length; i += 1) {
    const rand = Math.random();

    if (rand < chance) {
      results.push(array[i]);
    }
  }

  if (mustReturnOne && results.length === 0) {
    results.push(array[randomRange(0, array.length - 1)]);
  }

  return results;
}

const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

function generateOptions() {
  return {
    color_name: faker.commerce.color(),
    color_value: faker.internet.color(),
    sizes: arrayFromArrayRandom(sizes),
  };
}

function generatePrice() {
  const discountChance = 0.5;

  const base = faker.commerce.price();
  const discount = Math.random() > discountChance ? Math.random().toPrecision(2) : 0;
  const current = base - base * discount;

  return { base, discount, current };
}

function generateRating() {
  return {
    stars: randomRange(0, 5),
    count: randomRange(0, 500),
  };
}

function productGenerator() {
  const product = {
    brand_name: faker.company.companyName(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: generatePrice(),
    rating: generateRating(),
    options: arrayOfRandomLengthFrom(1, 5, generateOptions),
  };

  return product;
}

function imagesGenerator() {
  const imageSet = arrayOfRandomLengthFrom(2, 5, () => faker.image.imageUrl(240, 440, 'fashion', true));
  const image = {
    image_url: imageSet.join(),
  };
  return image;
}
// manually created csv files and added headers in
// write function no longer does anything to check if file exists (fs.existsSync)
// fields are not added conditionally, since they're already present in the file
const write = async (fileName, data) => {
  const file = path.join(__dirname, `${fileName}`);
  const rows = await parse(data, { header: false });
  fs.appendFileSync(file, rows);
  fs.appendFileSync(file, '\r\n');
};

var numProductsToGenerate = process.argv[2] || 5;
while (numProductsToGenerate > 0) {
  var products = productGenerator();
  write('products.csv', products);

  var images = imagesGenerator();
  write('images.csv', images);

  numProductsToGenerate--;
}

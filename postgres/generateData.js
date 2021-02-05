/* this file is for generating fake data and writing it to the data.csv file */
const faker = require('faker');
const { Parser } = require('json2csv');
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
  /*
  one image set (one record) will be a string of urls, separated by
  a comma, with no space.
  example: 'str1,str2,str3'
   */
  return imageSet.join();
}

(async () => {
  const numProductsToGenerate = process.argv[2] || 1;
  const products = [];
  const images = [];

  for (let i = 0; i < numProductsToGenerate; i += 1) {
    products.push(productGenerator());
    images.push(imagesGenerator());
  }
  const productsHeader = ['brand_name', 'name', 'description', 'price', 'rating', 'options'];
  const productsInCsv = new Parser({ fields: productsHeader }).parse(products);
  const productsWriter = fs.createWriteStream('products.csv');
  productsWriter.write(productsInCsv);

  const imagesHeader = ['image_url'];
  const imagesInCsv = new Parser({ fields: imagesHeader }).parse(images);
  const imagesWriter = fs.createWriteStream('images.csv');
  imagesWriter.write(imagesInCsv);
})();

/*
let userHeader = ["username", "age", "email", "location"];
const usersInCsv = new Parser({ fields: userHeader }).parse(userData);
let usersWriter = fs.createWriteStream('users.csv');
usersWriter.write(usersInCsv);
*/

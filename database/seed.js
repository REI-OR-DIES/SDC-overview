const faker = require('faker');
const database = require('./index.js');
const Product = require('./models/Product');

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
  let id = 0;

  return () => {
    const product = {
      product_id: id,
      brand_name: faker.company.companyName(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: generatePrice(),
      rating: generateRating(),
      image_urls: arrayOfRandomLengthFrom(2, 5, () => faker.image.imageUrl(240, 440, 'fashion', true)),
      options: arrayOfRandomLengthFrom(1, 5, generateOptions),
    };

    id += 1;

    return product;
  };
}

(async () => {
  const generateProduct = productGenerator();
  const numProductsToGenerate = process.argv[2] || 10;
  const products = [];
  let existingProducts;

  try {
    existingProducts = await Product.getAllProducts();
  } catch (e) {
    console.log(e);
  }

  if (existingProducts) {
    console.log(`Removing ${existingProducts.length} existing products..`);
    await Product.clearProducts();
  }

  console.log(`Seeding database with ${numProductsToGenerate} products..`);

  for (let i = 0; i < numProductsToGenerate; i += 1) {
    products.push(generateProduct());
  }

  let addedProducts;
  try {
    addedProducts = await Product.addProducts(products);
  } catch (e) {
    console.log(e);
  }

  console.log(`Seeded database with ${addedProducts.length} products.`);

  database.disconnect();
})();

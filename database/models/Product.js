const mongoose = require('mongoose');

let Product;

const productSchema = mongoose.Schema({
  product_id: {
    type: Number,
    validate: {
      validator(productId) {
        return Product.findOne({ product_id: productId })
          .then((r) => (r === null));
      },
      message: 'Product Id validation failed, duplicate id found',
    },
  },
  brand_name: String,
  name: String,
  description: String,
  price: {
    base: Number,
    discount: Number,
    current: Number,
  },
  rating: {
    stars: Number,
    count: Number,
  },
  image_urls: [String],
  options: [{
    color_name: String,
    color_value: String,
    sizes: [String],
  }],
});

Product = mongoose.model('products', productSchema);

const clearProducts = () => Product.deleteMany({});

const addProduct = (product) => {
  const newProduct = new Product(product);
  return newProduct.save();
};

const addProducts = (products) => (
  Product.insertMany(products)
);

const getProductById = (productId) => (
  Product.findOne({ product_id: productId }).exec()
);

const getAllProducts = () => (
  Product.find({}).exec()
);

const getRandomProduct = async () => {
  const count = await Product.countDocuments({}).exec();
  const rand = Math.floor(Math.random() * count);

  return Product.findOne({}).skip(rand).exec();
};

module.exports.addProduct = addProduct;
module.exports.addProducts = addProducts;
module.exports.getProductById = getProductById;
module.exports.getAllProducts = getAllProducts;
module.exports.getRandomProduct = getRandomProduct;
module.exports.clearProducts = clearProducts;

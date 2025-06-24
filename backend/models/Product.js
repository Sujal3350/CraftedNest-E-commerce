const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  originalPrice: Number,
  rating: Number,
  reviews: Number,
  image: String
});

module.exports = mongoose.model('Product', productSchema);

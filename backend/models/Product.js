const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  rating: { type: Number },
  reviews: { type: Number },
  image: { type: String },
  category: { type: String, required: true }, // e.g., "Sofa", "Chair", "Kitchen", "Shelf"
});

module.exports = mongoose.model('Product', productSchema);
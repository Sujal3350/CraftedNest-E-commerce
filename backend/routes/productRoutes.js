const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    const formattedProducts = products.map(product => ({
      _id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: Number(product.price),
      originalPrice: product.originalPrice ? Number(product.originalPrice) : null,
      rating: product.rating,
      reviews: product.reviews,
      image: product.image,
      category: product.category, // Include category
    }));
    res.json(formattedProducts);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
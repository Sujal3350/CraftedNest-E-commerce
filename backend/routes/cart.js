const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart'); // Adjust path if needed

// Add to cart
router.post('/add', async (req, res) => {
  const { userId, product } = req.body;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const existingItem = cart.items.find(item => item.productId === product._id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({
      productId: String(product.id), 
      name: product.name,
      price: Number(product.price.replace(/[₹,]/g, '')),
      image: product.image,
      quantity: 1,
    });
  }

  await cart.save();
  res.status(200).json({ message: "Added to cart" });
});

// Get cart
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const cart = await Cart.findOne({ userId });

  if (!cart) {
    return res.json({ items: [] });
  }

  res.json({ items: cart.items });
});

module.exports = router;

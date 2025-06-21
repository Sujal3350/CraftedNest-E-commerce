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
      price: Number(product.price),
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

router.put('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    const item = cart.items.find(item => item.productId === productId);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    item.quantity = quantity;
    await cart.save();

    res.json({ items: cart.items });
  } catch (err) {
    console.error('Error updating cart quantity:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.delete('/:userId/:productId', async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    cart.items = cart.items.filter(item => item.productId !== productId);
    await cart.save();

    res.json({ items: cart.items });
  } catch (err) {
    console.error('Error removing item:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


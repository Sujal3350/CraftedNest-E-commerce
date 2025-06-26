const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');

// GET: Get all wishlist items for a user
router.get('/:userId', async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.params.userId });
    res.json(wishlist || { userId: req.params.userId, items: [] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch wishlist' });
  }
});

// POST: Add item to wishlist
router.post('/add', async (req, res) => {
  const { userId, product } = req.body;

  try {
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, items: [product] });
    } else {
      // Avoid duplicates
      const exists = wishlist.items.some(item => item.productId === product.productId);
      if (!exists) wishlist.items.push(product);
    }

    await wishlist.save();
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add item to wishlist' });
  }
});

// DELETE: Remove item from wishlist
router.delete('/:userId/:productId', async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.params.userId });

    if (!wishlist) return res.status(404).json({ error: 'Wishlist not found' });

    wishlist.items = wishlist.items.filter(item => item.productId !== req.params.productId);
    await wishlist.save();

    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove item from wishlist' });
  }
});

module.exports = router;

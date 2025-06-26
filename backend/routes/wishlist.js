const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');

// Get wishlist for a user
router.get('/:userId', async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.params.userId });
    res.json(wishlist ? wishlist.items : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add product to wishlist
router.post('/add', async (req, res) => {
  const { userId, product } = req.body;
  let wishlist = await Wishlist.findOne({ userId });
  if (!wishlist) {
    wishlist = new Wishlist({ userId, items: [] });
  }
  const exists = wishlist.items.find(item => item.productId.toString() === product._id);
  if (!exists) {
    wishlist.items.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    await wishlist.save();
    return res.status(200).json({ message: 'Added to wishlist' });
  }
  res.status(200).json({ message: 'Already in wishlist' });
});

// Remove product from wishlist
router.post('/remove', async (req, res) => {
  const { userId, productId } = req.body;
  let wishlist = await Wishlist.findOne({ userId });
  if (wishlist) {
    wishlist.items = wishlist.items.filter(item => item.productId.toString() !== productId);
    await wishlist.save();
    return res.status(200).json({ message: 'Removed from wishlist' });
  }
  res.status(404).json({ message: 'Wishlist not found' });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');

// Place a new order (from cart)
router.post('/place', async (req, res) => {
  const { userId, address } = req.body;
  const cart = await Cart.findOne({ userId });
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }
  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order = new Order({
    userId,
    items: cart.items,
    total,
    address
  });
  await order.save();
  // Clear cart after order
  cart.items = [];
  await cart.save();
  res.status(201).json({ message: 'Order placed', order });
});

// Get all orders for a user
router.get('/user/:userId', async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
  res.json(orders);
});

// Get order details
router.get('/:orderId', async (req, res) => {
  const order = await Order.findById(req.params.orderId);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

module.exports = router;

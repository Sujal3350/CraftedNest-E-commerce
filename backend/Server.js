

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static('dist')); // Serve frontend build (adjust if needed)

app.post('/api/gemini', async (req, res) => {
  const { prompt } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;
  const endpoint = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';

  try {
    // Dynamically import node-fetch
    const { default: fetch } = await import('node-fetch');
    const response = await fetch(`${endpoint}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });
    const data = await response.json();
    if (!data.candidates || !data.candidates[0]?.content?.parts[0]?.text) {
      throw new Error('Invalid API response');
    }
    res.json({ response: data.candidates[0].content.parts[0].text });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'API request failed' });
  }
});



const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {console.error(err);console.log(err.message)});
app.use('/api/products', productRoutes);

app.listen(5000, () => {
  console.log('🚀 Server running on port 5000');
});


const cartRoutes = require('./routes/cart');
app.use('/api/cart', cartRoutes);


const Cart = require('../backend/models/Cart'); // Cart model

const router = express.Router();
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
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  await cart.save();
  res.status(200).json({ message: "Added to cart" });
});

module.exports = router;
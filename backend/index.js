// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.static('dist')); // Serve frontend build (adjust if needed)

// app.post('/api/gemini', async (req, res) => {
//   const { prompt } = req.body;
//   const apiKey = process.env.GEMINI_API_KEY;
//   const endpoint = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';

//   try {
//     // Dynamically import node-fetch
//     const { default: fetch } = await import('node-fetch');
//     const response = await fetch(`${endpoint}?key=${apiKey}`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         contents: [{ parts: [{ text: prompt }] }],
//       }),
//     });
//     const data = await response.json();
//     if (!data.candidates || !data.candidates[0]?.content?.parts[0]?.text) {
//       throw new Error('Invalid API response');
//     }
//     res.json({ response: data.candidates[0].content.parts[0].text });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'API request failed' });
//   }
// });



// const mongoose = require('mongoose');
// const productRoutes = require('./routes/productRoutes');
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error(err));

// app.use('/api/products', productRoutes);

// app.listen(5000, () => {
//   console.log('Server running on port 5000');
// });
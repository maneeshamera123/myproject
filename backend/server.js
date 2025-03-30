const express = require('express');
const cors = require('cors');
const itemsRouter = require('./routes/items');

const app = express();
require('dotenv').config();

const corsOptions = {
  origin: [
    'https://myprojectfrontend-beryl.vercel.app',
    'http://localhost:3000'
  ],
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable preflight for all routes
app.use(express.json());
app.use('/api/items', itemsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
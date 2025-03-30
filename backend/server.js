const express = require('express');
const cors = require('cors');
const itemsRouter = require('./routes/items');

const app = express();
require('dotenv').config();

app.use(
    cors({
      origin: "https://myprojectfrontend-beryl.vercel.app",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
app.use(express.json());
app.use('/api/items', itemsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
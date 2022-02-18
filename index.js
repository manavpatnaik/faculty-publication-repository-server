const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');
dotenv.config();

// Connecting to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

// Made a small change (By MOHAN)
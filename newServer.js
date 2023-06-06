




require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
const BookData = require('./books');
const Seed = require('./seed');
const authorize = require('./authorize'); // Import the authorization middleware

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/books', authorize, async (req, res) => {
  // Access the signed-in user's email with request.user.email
  const userEmail = req.user.email;

  try {
    await mongoose.connect(process.env.Database_Url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const books = await BookData.find();

    mongoose.disconnect();

    res.json(books);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/books', authorize, async (req, res) => {
  const userEmail = req.user.email;

  try {
    await mongoose.connect(process.env.Database_Url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const newBook = await BookData.create(req.body);
    const books = await BookData.find();
    res.json(books);
  } catch (error) {
    console.error('Error:', error);
    res.status
  }})
  
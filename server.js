'use strict';

require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
// process.env.DatabaseUrl = 'mongodb://localhost:27017/BookDB'
const BookData = require('./books'); // Import the BookData model or data access layer

const Seed = require('./seed'); // Import the seed script for database population

const app = express();
app.use(cors());
app.use(express.json())
const PORT = process.env.PORT || 3001;




app.get('/', (req, res) => {
  // Sending a response to the client
  res.send('Hello World!')


})

app.get('/books', async (req, res) => {
  try {
    await mongoose.connect(process.env.Database_Url, {
      useNewUrlParser: true,
      useUnifiedTopology: true

    });

    const books = await BookData.find(); // this is retreieving the books from the BookData model

    mongoose.disconnect();// Disconnect from the database

    res.json(books); // sending the books as a JSON response to client 

    console.log(books)
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// app.get('/books', async (req, res) => {
//   await mongoose.connect(process.env.DatabaseUrl)
//   .then(()=> {
//     console.log('is connected');
//   })
//   .catch((err) => {
//     console.error('Error: ', err)
//   })
// mongoose.disconnect();
//   res.send('it works hooray')
// }

// )





app.get('/test', (request, response) => {
  // sending a response to the client
  response.send('test request received')

})

app.listen(PORT, () => console.log(`listening on ${PORT}`)); // Start the server and log the port

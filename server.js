'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
// process.env.DatabaseUrl = 'mongodb://localhost:27017/BookDB'
const BookData = require('./books')
const Seed = require('./seed')

const app = express();
app.use(cors());
app.use(express.json())
const PORT = process.env.PORT || 3001;




app.get('/', (req, res) => {
  // Send a response to the client
  res.send('Hello World!')


})

app.get('/books', async (req, res) => {
  try {
    await mongoose.connect(process.env.Database_Url, {
      useNewUrlParser: true,
      useUnifiedTopology: true

    });

    const books = await BookData.find();

    mongoose.disconnect();

    res.json(books);

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

  response.send('test request received')

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));

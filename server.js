

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
    //const conn = await mongoose.createConnection(process.env.Database_Url).asPromise();
    //mongoose.model('Book', BookData)

    const books = await BookData.find(); // this is retreieving the books from the BookData model

    mongoose.disconnect();// Disconnect from the database

    res.json(books); // sending the books as a JSON response to client 

    console.log(books)
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/books', async (req, res) => {
  try {
    await mongoose.connect(process.env.Database_Url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    // Create a new book record in the database using the data from the request body
    const newBook = await BookData.create(req.body);
    const books = await BookData.find()
    res.send(books); // Return the newly created book as a JSON response
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.delete('/books/:id', async (req, res) => {
  try {
    await mongoose.connect(process.env.Database_Url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const bookId = req.params.id; // Access the book id from request params

    // Find and delete the book with the given id
    const deletedBook = await BookData.findByIdAndDelete(bookId);

    mongoose.disconnect(); // Disconnect from the database

    if (!deletedBook) {
      return res.status(404).send('Book was not found with the entered name');
    }

    res.json(deletedBook); // Return the deleted book as a JSON response
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal server error' );
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

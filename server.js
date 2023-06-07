

require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
// process.env.DatabaseUrl = 'mongodb://localhost:27017/BookDB'

const jwt = require('express-jwt')
const jwks = require('jwks-rsa')
const axios = require('axios')
// const { JwksClient } = require('jwks-rsa');
const BookData = require('./books'); // Import the BookData model or data access layer
const Seed = require('./seed'); // Import the seed script for database population




const app = express();
app.use(cors());
app.use(express.json())
const PORT = process.env.PORT || 3001;

// const verifyJWT = jwt({
//   secret: jwks.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: 'http://allow-edit-book.us.auth0.com/.well-known/jwks.json'
//   }),
//   audience: 'http://localhost:3001',
//   issuer: 'http://allow-edit-book.us.auth0.com/',
//   algorithms: ['RS256']
// }).unless({ path: ['/books'] })

// app.use(verifyJWT);

app.get('/', (req, res) => {
  // Sending a response to the client
  res.send('Hello World!')


})

app.get('/books', async (req, res) => {
  // const userEmail = req.user.email;
  try {  
    await mongoose.connect(process.env.Database_Url, {
      useNewUrlParser: true,
      useUnifiedTopology: true

    });
    // const accessToken = req.headers.authorization.split(' ')[1];
    // const user = await axios.get('http://allow-edit-book.us.auth0.com/userinfo', {
    //   headers: {
    //     authorization: `Bearer ${accessToken}`
    //   }
    // });
    // const userinfo = user.data;
    // res.send(userinfo)

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

    // const accessToken = req.headers.authorization.split(' ')[1];
    // const user = await axios.get('http://allow-edit-book.us.auth0.com/userinfo', {
    //   headers: {
    //     authorization: `Bearer ${accessToken}`
    //   }
    // });
    // const userinfo = user.data;
    // res.send(userinfo)
    
    
    // Create a new book record in the database using the data from the request body
    const newBook = await BookData.create(req.body);
    const books = await BookData.find()
    res.send(books); // Return the newly created book as a JSON response
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.delete('/books/:id',  async (req, res) => {
  try {
    await mongoose.connect(process.env.Database_Url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const bookId = req.params.id; // Access the book id from request params

    // const accessToken = req.headers.authorization.split(' ')[1];
    // const user = await axios.get('http://allow-edit-book.us.auth0.com/userinfo', {
    //   headers: {
    //     authorization: `Bearer ${accessToken}`
    //   }
    // });
    // const userinfo = user.data;
    // res.send(userinfo)

    // Find and delete the book with the given id
    const deletedBook = await BookData.findByIdAndDelete(bookId);
    const books = await BookData.find()

    mongoose.disconnect(); // Disconnect from the database

    if (!deletedBook) {
      return res.status(404).send('Book was not found with the entered name');
    }

    res.json(books); // Return the deleted book as a JSON response
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal server error');
  }
});

app.put('/books/:id',  async (req, res) => {
  try {
    await mongoose.connect(process.env.Database_Url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const bookId = req.params.id; // Access the book id from request params
    const { title, description, status } = req.body

    // const accessToken = req.headers.authorization.split(' ')[1];
    // const user = await axios.get('http://allow-edit-book.us.auth0.com/userinfo', {
    //   headers: {
    //     authorization: `Bearer ${accessToken}`
    //   }
    // });
    // const userinfo = user.data;
    // res.send(userinfo)

    
    // Find the book with the given id and update its data with the request body
    const updatedBook = await BookData.findByIdAndUpdate(bookId, { title, description, status }, { new: true });
    const books = await BookData.find();

    mongoose.disconnect(); // Disconnect from the database

    if (!updatedBook) {
      return res.status(404).send('Book was not found with the entered title');
    }

    res.json(books); // Return0 the updated book as a JSON response
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal server error');
  }
});


app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});


app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 'Internal server error';
  res.status(status).send(message);
});


app.get('/test', async (request, response) => {
  // sending a response to the client
  response.send('test request received')

  // const accessToken = request.headers.authorization.split(' ')[1];
  // try{
  //   const user = await axios.get('http://allow-edit-book.us.auth0.com/userinfo', {
  //     headers: {
  //       authorization: `Bearer ${accessToken}`
  //     }
  //   });
  //   const userinfo = user.data;
  //   res.send(userinfo)

  // } catch (error) {
  //   console.log(error);
  //   res.status(500).send('Internal Server Error')
  // }
}


)

app.listen(PORT, () => console.log(`listening on ${PORT}`)); // Start the server and log the port

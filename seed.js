const mongoose = require('mongoose');
const Book = require('./books')
// process.env.DatabaseUrl = 'mongodb://localhost:27017/BookDB'
require('dotenv').config();


mongoose.connect(process.env.Database_Url);

async function seed() {
    
    await Book.create({
        title: 'Harry Potter',
        description: 'A young Wizard',
        status: 'Published'
        
    });
    
    await Book.create({
        title: 'Mazerunner',
        description: 'boys trapped in a maze',
        status: 'Published'
    });
    await Book.create({
        title: 'Marvel v Dc',
        description: 'Fight between 2 universe',
        status: 'Published'
    });
    console.log('Book is saved');
    
    mongoose.disconnect();
}

seed();


// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/mydatabase', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// Create three Book objects
// const books = [
//   {
//     title: 'Book 1',
//     description: 'Description of Book 1',
//     status: 'Available',
//   },
//   {
//     title: 'Book 2',
//     description: 'Description of Book 2',
//     status: 'Reserved',
//   },
//   {
//     title: 'Book 3',
//     description: 'Description of Book 3',
//     status: 'Checked Out',
//   },
// ];

// Save the books to the database
// Book.create(books)
//   .then((createdBooks) => {
//     console.log('Books created:', createdBooks);
//     mongoose.connection.close();
//   })
//   .catch((error) => {
//     console.error('Error seeding database:', error);
//     mongoose.connection.close();
//   });

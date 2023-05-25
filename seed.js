const mongoose = require('mongoose');
const Book = require('./books')
// process.env.DatabaseUrl = 'mongodb://localhost:27017/BookDB'
require('dotenv').config();

// Retrieve the database URL from the 'Database_Url' environment variable


async function seed() {
    await mongoose.connect(process.env.Database_Url, );
    
    // Create and save the first book with the attributes
    const djBook = new Book({
        title: 'Harry Potter',
        description: 'an orphan brought up by his aunt and uncle because his parents were killed when he was a baby. Harry is unloved by his uncle and aunt but everything changes when he is invited to join Hogwarts School of Witchcraft and Wizardry and he finds out he is a wizard',
        status: 'Published'
    });
    await djBook.save()
    // await Book.create({
    //     title: 'Harry Potter',
    //     description: 'an orphan brought up by his aunt and uncle because his parents were killed when he was a baby. Harry is unloved by his uncle and aunt but everything changes when he is invited to join Hogwarts School of Witchcraft and Wizardry and he finds out he is a wizard',
    //     status: 'Published' 
        
    // });
    // // This is creating the second book with the attributes
    // await Book.create({
    //     title: 'Mazerunner',
    //     description: 'is the first novel in a popular dystopian science fiction series by James Dashner that chronicles how the world was changed by a series of devastating events. Throughout the series, a group of teenagers tries to save themselves and the world from a sinister organization known as WICKED.',
    //     status: 'Published'
    // });
    // //this is creating the third book with the attributes
    // await Book.create({
    //     title: 'Goosebumps',
    //     description: 'Goosebumps is a series of horror novels written by American author R. L. Stine. The protagonists in these stories are tweens or young teens who find themselves in scary circumstances usually involving the supernatural, the paranormal or the occult.',
    //     status: 'Published'
    // });
    console.log('Book is saved'); // Displaying a success message 
    
    mongoose.disconnect(); // this is disconnecting from the database. 
}

seed(); // calling the seed function to add stuff in the database.


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

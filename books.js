const mongoose = require('mongoose');



const bookSchema = new mongoose.Schema({
    title:String,
    description:String,
    status:String,
//   title: {
//     type: String,
//     required: true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ['Available', 'Reserved', 'Checked Out'],
//     default: 'Available'
//   }
  
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;

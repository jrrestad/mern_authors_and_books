const mongoose = require('mongoose');
const { BookSchema } = require('./book.nested.model');

const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "An author name is required."],
        minlength: [3, "Author name minimum length is 3 characters."]
    },
    books: [BookSchema]
}, {timestamps:true})

const Author = mongoose.model("Author", AuthorSchema);

module.exports = {
    Author
}
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/author_and_books_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then( () => console.log("Connection to author_and_books DB established"))
.catch( err => console.log("Something went wrong when connecting to the DB: ", err))
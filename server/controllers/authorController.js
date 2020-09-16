const { Author } = require('../models/author.model');

module.exports = {
    getAllAuthor: (req, res) => {
        Author.find({})
        .then(data => {
            if (data.length > 0) {
                res.json(data)
            } else {
                res.status(500).json({ error: "No data in the database"})
            }
        })
        .catch(err => res.json(err))
    },
    getOneAuthor: (req, res) => {
        Author.findOne({_id: req.params.id})
        .then(data => res.json(data))
        .catch(err => res.json(err))
    },
    createAuthor: (req, res) => {
        Author.create(req.body)
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },
    updateAuthor: (req, res) => {
        Author.findOneAndUpdate({ _id: req.params.id}, req.body, {new: true, runValidators: true, useFindAndModify: false })
        .then(data => res.json(data))
        .catch(err => res.json(err))
    },
    deleteAuthor: (req, res) => {
        Author.findOneAndDelete({ _id: req.params.id })
        .then(data => res.json(data))
        .catch(err => res.json(err))
    },
    // books
    getAllBook: (req, res) => {
        Author.findOne({ 'books._id': req.params.bId })
        .then(data => res.json(data.books))
        .catch(err => res.json(err))
    },
    getOneBook: (req, res) => {
        Author.findOne({ 'books._id': req.params.bId })
        .then(data => res.json(data.books.filter(item => item._id == req.params.bId)[0]))
        .catch(err => res.json(err))
    },
    updateBook: (req, res) => { 
        Author.findOneAndUpdate({ 'books._id': req.params.bId}, {$set: { 'books.$': req.body}}, { new: true, runValidators: true, useFindAndModify: false} )
        .then(data => res.json(data))
        .catch(err => res.json(err))
    },
    deleteBook: (req, res) => {
        Author.findOneAndUpdate({ _id: req.params.id}, { $pull: { books: { _id: req.params.bId } } }, { new: true, useFindAndModify: false })
        .then(data => res.json(data))
        .catch(err => res.json(err))
    },
    createBook: (req, res) => {
        Author.findOneAndUpdate({ _id: req.params.id }, { $addToSet: { books: req.body }}, { runValidators: true, new: true })
        .then(data => res.json(data))
        .catch(err => res.json(err));
    }
}
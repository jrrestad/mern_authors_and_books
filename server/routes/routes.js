const controller = require('../controllers/authorController');

module.exports = app => {
    // authors
    app.get('/api/author', controller.getAllAuthor);
    app.get('/api/author/:id', controller.getOneAuthor);
    app.post('/api/author', controller.createAuthor);
    app.patch('/api/author/update/:id', controller.updateAuthor);
    app.delete('/api/author/delete/:id', controller.deleteAuthor);

    // books
    app.get('/api/author/:bId/book', controller.getAllBook);
    app.get('/api/author/book/:bId', controller.getOneBook);
    app.patch('/api/author/:id/book', controller.createBook);
    app.patch('/api/author/book/update/:bId', controller.updateBook);
    app.patch('/api/author/:id/book/delete/:bId', controller.deleteBook);
}
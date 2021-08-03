const express = require('express');
const booksController = require('../controllers/books.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const Router = express.Router();

Router.get('/', booksController.getAllBooks);

Router.get('/:name', booksController.getBookByName);

Router.post('/', authMiddleware, booksController.createNewBook);

Router.put('/:name', authMiddleware, booksController.updateBook);

Router.delete('/:name', authMiddleware, booksController.deleteBook);

module.exports = Router;
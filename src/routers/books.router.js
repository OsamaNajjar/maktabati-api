const express = require('express');
const booksController = require('../controllers/books.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const {checkValidationResults} = require('../middlewares/utils.middleware');
const { queryMiddleware } = require('@abujude/sgs-khadamati');
const { check, query, body , param} = require('express-validator');

const Router = express.Router();

Router.get('/'
    , queryMiddleware.split(['names'], ',')
    , query('year', 'Invalid book year!')
        .optional({checkFalsy: true})
        .isInt({min: 2000, max: new Date().getFullYear()})
    , checkValidationResults
    , booksController.getAllBooks);

Router.get('/:isbn', booksController.getBookByISBN);

Router.post('/', authMiddleware, booksController.createBook);

Router.put('/:name', authMiddleware, booksController.updateBook);

Router.delete('/:name', authMiddleware, booksController.deleteBook);

module.exports = Router;
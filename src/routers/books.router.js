const express = require('express');
const booksController = require('../controllers/books.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const {checkValidationResults} = require('../middlewares/utils.middleware');
const { queryMiddleware } = require('@abujude/sgs-khadamati');
const { check, query, body , param} = require('express-validator');

const Router = express.Router();

const checkBook = (req, res, next) => {

}

Router.get('/'
    , queryMiddleware.split(['names'], ',')
    , query('year', 'Invalid book year!')
        .optional({checkFalsy: true})
        .isInt({min: 1990, max: new Date().getFullYear()})
    , checkValidationResults
    , booksController.getAllBooks);

Router.get('/:isbn', booksController.getBookByISBN);

const bookValidations = [
    body('name')
        .notEmpty()
    , body('year', 'Invalid year')
        .isInt({min: 1990, max: new Date().getFullYear()})
    , body('author')
        .notEmpty()
    , body('price', 'Invalid Price')
        .isDecimal({min: 0})
]

Router.post('/'
    , bookValidations
    , checkValidationResults
    , authMiddleware
    , booksController.createBook);

Router.put('/:name'
    , bookValidations
    , checkValidationResults
    , authMiddleware
    , booksController.updateBook);

Router.delete('/:name', authMiddleware, booksController.deleteBook);

module.exports = Router;
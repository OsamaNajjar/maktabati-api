const express = require('express');
const booksController = require('../controllers/books.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const {checkValidationResults, checkSchema } = require('../middlewares/utils.middleware');
const { queryMiddleware } = require('@abujude/sgs-khadamati');
const { check, query, body , param} = require('express-validator');
const schema = require('../Validations/bookSchemas');


const Router = express.Router();

const checkBook = (req, res, next) => {

}

Router.get('/'
    , queryMiddleware.split(['names'], ',')
    , query('year', 'Invalid book year!')
        .optional({checkFalsy: true})           
        .isInt({min: 1900, max: new Date().getFullYear()})
    , checkValidationResults
    , booksController.getAllBooks);

Router.get('/:isbn', booksController.getBookByISBN);

const bookValidations = [
    body('name')
        .notEmpty()
    , body('year', 'Invalid year')
        .isInt({min: 1900, max: new Date().getFullYear()})
    , body('author')
        .notEmpty()
    , body('price', 'Invalid Price')
        .isDecimal({min: 0})
    , body('quantity', 'Invalid quantity')
        .isInt({min: 0})
    , body('row')
        .notEmpty()
    , body('shelf')
        .notEmpty()
]

Router.post('/'
    , checkSchema(schema.bookPost,'body')
    , checkValidationResults
    , authMiddleware
    , booksController.createBook);

Router.put('/:isbn'
    , bookValidations
    , checkValidationResults
    , authMiddleware
    , booksController.updateBook);

Router.delete('/:isbn', authMiddleware, booksController.deleteBook);

module.exports = Router;
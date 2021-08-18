const booksManager = require('../managers/books.manager');
const modelMapper = require('../models/model-mapper');

exports.getAllBooks = async (req, res, next) => {

    try {

        const { names , author, isbn, fromYear, toYear} = req.query;

        const results = await booksManager.getAllBooks(names, author, isbn, fromYear, toYear);

        return res.json(results.map(book => modelMapper.mapToBookDTO(book.toJSON())));

    } catch (error) {
        error.httpStatusCode = error.httpStatusCode || 500;
        return next(error);
    }

};

exports.getBookByISBN = async (req, res, next) => {

    try {

        const isbn = req.params.isbn;

        const result = await booksManager.getBookByISBN(isbn);
        
        if(!result) {
            const error = new Error();
            error.httpStatusCode = 404;
            throw error;
        }

        return res.json(modelMapper.mapToBookDTO(result.toJSON()));

    } catch (error) {
        error.httpStatusCode = error.httpStatusCode || 500;
        return next(error);
    }

};

const validateBook = (bookDTO) => {

    let validationMessage = '';


}

exports.createBook = async (req, res, next) => {

    try {

        const bookDTO = req.body;

        if(!bookDTO) {
            const error = new Error('Book required!');
            error.httpSatutsCode = 401;
            throw error;
        }

        const result = await booksManager.createBook(bookDTO);

        return res.status(201).json(modelMapper.mapToBookDTO(result.toJSON()));
          
    } catch(error) {
        error.httpStatusCode = error.httpStatusCode || 500;
        return next(error);
    }

}

exports.updateBook = async (req, res, next) => {

    try {

        const isbn = req.params.isbn;
        const bookDTO = req.body;

        if(!bookDTO) {
            const error = new Error('Book required!');
            error.httpSatutsCode = 401;
            throw error;
        }

        const bookModel = modelMapper.mapToBookModel(bookDTO);

        const result = await booksManager.updateBook(isbn,bookModel);

        if(!result) {
            const error = new Error();
            error.httpStatusCode = 404;
            throw error;
        }

        return res.status(200).json(modelMapper.mapToBookDTO(result.toJSON()));

    } catch(error) {
        error.httpStatusCode = error.httpStatusCode || 500;
        return next(error);
    }
};

exports.deleteBook = async (req, res, next) => {
    try {

        const isbn = req.params.isbn;

        //Check if item exist.
        //Check for any borrows
        
        const result = await booksManager.deleteBook(isbn);

        if(!result) {
            const error = new Error();
            error.httpStatusCode = 404;
            throw error;
        }

        return res.status(200).json();

    } catch(error) {
        error.httpStatusCode = error.httpStatusCode || 500;
        return next(error);
    }
};

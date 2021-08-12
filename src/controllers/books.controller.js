const booksManager = require('../managers/books.manager');

exports.getAllBooks = async (req, res, next) => {

    try {

        const { names , author, isbn, fromYear, toYear} = req.query;

        const results = await booksManager.getAllBooks(names, author, isbn, fromYear, toYear);

        return res.json(results);

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

        return res.json(result);

    } catch (error) {
        error.httpStatusCode = error.httpStatusCode || 500;
        return next(error);
    }

};

exports.createBook = async (req, res, next) => {

    try {

        const bookDTO = req.body;

        const result = await booksManager.createBook(bookDTO);

        return res.status(201).json(result);
          
    } catch(error) {
        error.httpStatusCode = error.httpStatusCode || 500;
        return next(error);
    }

}

exports.updateBook = (req, res, next) => {

    try {

    } catch(error) {
        error.httpStatusCode = error.httpStatusCode || 500;
        return next(error);
    }

     res.json({result: "updated"});

};

exports.deleteBook = (req, res, next) => {

};

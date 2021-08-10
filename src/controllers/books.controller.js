const booksManager = require('../managers/books.manager');



exports.getAllBooks = async (req, res, next) => {

    try {

        const { year, names , auther} = req.query;

        const books = await booksManager.getAllBooks(names);

        return res.json(books);

    } catch (error) {
        error.httpStatusCode = error.httpStatusCode || 500;
        return next(error);
    }

};

exports.getBookByName = async (req, res, next) => {

    try {

        const name = req.params.name;

        const book = await booksManager.getBookByName(name);
        
        if(!book) {
            const error = new Error();
            error.httpStatusCode = 404;
            throw error;
        }

        return res.json(book);

    } catch (error) {
        error.httpStatusCode = error.httpStatusCode || 500;
        return next(error);
    }

};

exports.createNewBook = (req, res, next) => {

    try {

        const newBook = req.body;

        return res.status(201).json(newBook);
          
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

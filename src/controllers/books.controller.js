
exports.getAllBooks = (req, res, next) => {

    try {

        const { year, name, auther} = req.query;

        const books = [
            {name: "book1" , year: 2020}
            , {name: "book2" , year: 2021}
        ];

        return res.json(books.filter(b => b.year === +year));

    } catch (error) {
        error.httpStatusCode = error.httpStatusCode || 500;
        return next(error);
    }

};

exports.getBookByName = (req, res, next) => {

    try {

        const name = req.params.name;

        const books = [
            {name: "book1" , year: 2020}
            , {name: "book2" , year: 2021}
        ];

        const book = books.find(b => b.name === name);

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

}

exports.createNewBook = (req, res, next) => {

    try {

        const newBook = req.body;

        return res.json(newBook);
          
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


exports.getAllBooks = (req, res, next) => {

    try {

        const { year, name, auther} = req.query;

        const books = [
            {name: "book1" , year: 2020}
            , {name: "book2" , year: 2021}
        ];

        return res.json(books.filter(b => b.year === +year));

    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: "Please try again later" });
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
            return res.status(404).send();
        }

        return res.json(book);

    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: "Please try again later" });
    }

}

exports.createNewBook = (req, res, next) => {

    try {

        const newBook = req.body;

        return res.json(newBook);
          
    } catch {
        console.log(error)
        return res.status(500).send({ error: "Please try again later" });
    }

}

exports.updateBook = (req, res, next) => {

};

exports.deleteBook = (req, res, next) => {

};

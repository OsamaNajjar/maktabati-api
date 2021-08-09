const Book = require('./book.model');

exports.mapBookDTO = (bookModel) => {

    const book = new Book(bookModel.id ,bookModel.name, bookModel.year, bookModel.author);

    delete book.id;
    book.key = book.name + book.year;

    return book
}
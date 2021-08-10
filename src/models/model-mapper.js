const Book = require('./book.model');

exports.mapBookDTO = (bookModel) => {

    const book = new Book(bookModel.id ,bookModel.name, bookModel.author, bookModel.isbn, 
        bookModel.year, bookModel.price, bookModel.quantity, bookModel.row, bookModel.shelf  );

    delete book.id;
    book.key = book.name + book.year;

    return book
}
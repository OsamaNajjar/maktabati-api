const BookDTO = require('./book.dto');
const BookModel = require('../database/models/book.model');

exports.mapToBookDTO = (bookModel) => {

    const bookDTO = {...bookModel, isbn: bookModel.Book.isbn};

    [
        'id'
      , 'Book'
      , 'itemType'
      , 'updatedAt'
      , 'createdAt'
    ].forEach(key => delete bookDTO[key]);

    bookDTO.key = bookDTO.name + bookDTO.year;

    return bookDTO;
}

exports.mapToBookModel = (bookDTO) => {
 
    const bookModel = { ...bookDTO , Book: { isbn: bookDTO.isbn } };
    delete bookModel.isbn;

    return bookModel;
}

module.exports = class Book {

    constructor(id, name, author, isbn, year, price, quantity, row, shelf) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.isbn  = isbn;
        this.year = year;
        this.price = price;
        this.quantity = quantity;
        this.row = row;
        this.shelf = shelf
    }

}
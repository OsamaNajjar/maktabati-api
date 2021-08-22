module.exports = class BookDTO {

    constructor(name ,nameAr, author, isbn, year, price, quantity, row, shelf, column) {
        this.name = name;
        this.nameAr = nameAr;
        this.author = author;
        this.isbn  = isbn;
        this.year = year;
        this.price = price;
        this.quantity = quantity;
        this.row = row;
        this.shelf = shelf;
        this.column = column
    }

}
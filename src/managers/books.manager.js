const { Op, Sequelize } = require('sequelize');

const Item = require('../database/models/item.model');
const Book = require('../database/models/book.model');
const sequelize = require('../database/db-client');


exports.getAllBooks = async (names, author, isbn, fromYear, toYear ) => {

    try {

        //Setup conditions
        let whereClause = {};

        whereClause['itemType'] = 'Book';

        if(names && names.length > 0) {
            whereClause['name'] = names;
        }
        if(author) {
            whereClause['author'] = {[Op.substring]: author};
        }
        if(isbn) {
            whereClause['$Book.isbn$'] = {[Op.substring]: isbn};
        }
        if(fromYear) {
            whereClause['year'] = {[Op.gte]: fromYear};
        }
        if(toYear) {
            whereClause['year'] = {[Op.lte]: toYear};
        }

        const items = await Item.findAll({
            where: whereClause
            , include: {
                model: Book
                , required: true
            }
        });

        return items;

    } catch(error) {
        throw error;
    }

}

exports.getBookByISBN = async (isbn) => {

    try {

        const bookItem = await Item.findOne({
            include: {
                model: Book
                , where: {
                    isbn: isbn
                }
            }
        });

        if(!bookItem) {
            return undefined;
        }

        return bookItem;

    } catch(error) {
        throw error;
    }

}

exports.createBook = async (bookModel) => {

    try {
        
        if(!bookModel) {
            const error = new Error('Book required!');
            throw error;
        }

        const result = await Item.create(bookModel, {
            include: [Book] 
        });

        return result;

    } catch(error) {
        throw error;
    }
}

exports.updateBook = async (isbn,bookModel) => {

    if(!bookModel) {
        const error = new Error('Book required!');
        throw error;
    }

    try {

        const currentBookItem = await this.getBookByISBN(isbn);

        if(!currentBookItem) {
            return undefined;
        } 

        await sequelize.transaction(async (t) => {

            await Item.update({...bookModel}
                , {where: {id: currentBookItem.id}
                    , transaction: t});
        
            await currentBookItem.Book.update({
                isbn: bookModel.Book.isbn
            },  { transaction: t });
        
            return;
        
        });

        return await this.getBookByISBN(bookModel.Book.isbn);

    } catch(error) {
        throw error;
    }

}

exports.deleteBook = async (isbn) => {

    try {

        const BookItem = await this.getBookByISBN(isbn);

        if(!BookItem) {
            return undefined;
        } 

        await sequelize.transaction(async (t) => {

            await BookItem.Book.destroy({
                            isbn: isbn
                        },  { transaction: t });

            await Item.destroy(
                {where: {id: BookItem.id}
                    , transaction: t});
        
            return;
            
        });

        return true;

    } catch(error) {
        throw error;
    }

}
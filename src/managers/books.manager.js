const { Op } = require('sequelize');

const Item = require('../database/models/Item.model');
const Book = require('../database/models/book.model');
const modelMapper = require('../models/model-mapper');

exports.getAllBooks = async (names, author, isbn, fromYear, toYear ) => {

    try {

        //Setup conditions
        let whereClause = {};

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
            whereClause['year'] = {[Op.gte]: isbn};
        }
        if(toYear) {
            whereClause['year'] = {[Op.lte]: isbn};
        }

        const items = await Item.findAll({
            where: whereClause
            , include: {
                model: Book
                , required: true
            }
        });

        return items.map(book => modelMapper.mapToBookDTO(book.toJSON()));

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

        return modelMapper.mapToBookDTO(bookItem.toJSON());

    } catch(error) {
        throw error;
    }

}

exports.createBook = async (bookDTO) => {

    try {
        
        if(!bookDTO) {
            const error = new Error('Book required!');
            error.httpSatutsCode = 401;
            throw error;
        }

        const bookModel = modelMapper.mapToBookModel(bookDTO);

        const result = await Item.create(bookModel, {
            include: [Book] 
        });

        return modelMapper.mapToBookDTO(result.toJSON());

    } catch(error) {
        throw error;
    }
}
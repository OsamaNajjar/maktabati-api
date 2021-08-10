const Book = require('../models/book.model');
const ModelMapper = require('../models/model-mapper');

exports.getAllBooks = async (ids, names ) => {

    try {

        const results =  [
            {id: 100, name: "book1", author: 'Osama', isbn:'118-111-122', year: 2020, price:150,
             quantity:2, row:'A-2', shelf:'20'},
            {id: 101, name: "book2", author: 'Sameer', isbn:'200-201-999', year: 2009, price:350,
             quantity:5, row:'A-1', shelf:'4'}
        ];

        return results.map(book => ModelMapper.mapBookDTO(book));

    } catch(error) {
        throw error;
    }

}

exports.getBookByName = async (name) => {

    try {

        const results =  [
            {id: 100, name: "book1", author: 'Osama', isbn:'118-111-122', year: 2020, price:150,
             quantity:2, row:'A-2', shelf:'20'},
            {id: 101, name: "book2", author: 'Sameer', isbn:'200-201-999', year: 2009, price:350,
             quantity:5, row:'A-1', shelf:'4'}
        ];

        const book = results.find(b => b.name === name);

        if(!book) {
            return undefined;
        }

        return ModelMapper.mapBookDTO(book);

    } catch(error) {
        throw error;
    }

}
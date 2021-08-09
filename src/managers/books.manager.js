const Book = require('../models/book.model');
const ModelMapper = require('../models/model-mapper');

exports.getAllBooks = async (ids, names ) => {

    try {

        const results =  [
            {id: 20, name: "book1" , year: 2020, author: 'Osama'}
            , {id:30, name: "book2" , year: 2021, author: 'Sameer'}
        ];

        return results.map(book => ModelMapper.mapBookDTO(book));

    } catch(error) {
        throw error;
    }

}
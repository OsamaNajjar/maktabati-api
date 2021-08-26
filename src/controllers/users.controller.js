const usersManager = require('../managers/users.manager');
const modelMapper = require('../models/model-mapper');

exports.getAllUsers = async (req, res, next) => {

    try {

        const { employeeId , email, name} = req.query;

        const results = await usersManager.getAllUsers(employeeId, email, name);

        return res.json(results.map(user => modelMapper.mapToUserDTO(user.toJSON())));

    } catch(error) {
        error.httpStatusCode = error.httpStatusCode || 500;
        return next(error);
    }

}

exports.getUserByEmail = async (req, res, next) => {

    try {
        const email = req.params.email;

        const result = await usersManager.getUserByEmail(email);

        if(!result) {
            const error = new Error();
            error.httpStatusCode = 404;
            throw error;
        }

       return res.json(modelMapper.mapToUserDTO(result.toJSON()));

    } catch(error) {
        error.httpStatusCode = error.httpStatusCode || 500;
        return next(error);
    }
}

exports.createUser = async (req, res, next) => {
    
    try {

        const userDTO = req.body;

        if(!userDTO) {
            const error = new Error('User required!');
            error.httpSatutsCode = 401;
            throw error;
        }

        const userModel = modelMapper.mapToUserModel(userDTO);

        const result = await usersManager.createUser(userModel);

        return res.status(201).json(modelMapper.mapToUserDTO(result.toJSON()));

    } catch(error) {
        error.httpStatusCode = error.httpStatusCode || 500;
        return next(error);
    }
}

exports.deleteBook = async (req, res, next) => {
    try {

        const isbn = req.params.isbn;

        //Check if item exist.
        //Check for any borrows
        
        const result = await booksManager.deleteBook(isbn);

        if(!result) {
            const error = new Error();
            error.httpStatusCode = 404;
            throw error;
        }

        return res.status(200).json();

    } catch(error) {
        error.httpStatusCode = error.httpStatusCode || 500;
        return next(error);
    }
};
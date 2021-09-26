const usersManager = require('../managers/users.manager');
const modelMapper = require('../models/model-mapper');

exports.getAllUsers = async (req, res, next) => {

    try {

        const { employeeId , email, name, lang} = req.query;

        const results = await usersManager.getAllUsers({employeeId, email, name});

        return res.json(results.map(user => modelMapper.mapToUserDTO(user.toJSON())));

    } catch(error) {
        error.httpStatusCode = error.httpStatusCode || 500;
        return next(error);
    }

}

exports.getByEmployeeId = async (req, res, next) => {

    try {
        const employeeId = req.params.employeeId;
        const {lang} = req.query;

        const result = await usersManager.getByEmployeeId(employeeId);

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
        const {lang} = req.query;

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

exports.loginUser = async (req, res, next) => {

    try {

        const { email, password } = req.body;

        console.log(req.body)

        const user = await usersManager.findByCredentials(email, password);

        if(!user) {
            const error = new Error('User not found!');
            error.httpSatutsCode = 404;
            throw error;
        }

        return res.status(200).json();

    } catch(error) {
        error.httpStatusCode = error.httpStatusCode || 500;
        return next(error);
    }
}

exports.updateUser = async (req, res, next) => {

    try {

        const employeeId = req.params.employeeId;
        const {lang} = req.query;

        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'email', 'password'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

        if(!isValidOperation) {
            const error = new Error();
            error.httpStatusCode = 401;
            throw error;
        }

        const result = await usersManager.updateUser(employeeId, req.body);

        res.status(200).json(modelMapper.mapToUserDTO(result.toJSON()));

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

        return res.status(200).json(modelMapper.mapToUserDTO(result.toJSON()));

    } catch(error) {
        error.httpStatusCode = error.httpStatusCode || 500;
        return next(error);
    }
};
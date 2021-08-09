const { validationResult } = require('express-validator');


exports.checkValidationResults = (req, res, next) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        const error = new Error('Invalid Data');
        error.httpStatusCode = 400;
        error.errorsData = errors.array(); 
        return next(error)
    }

    return next()

}
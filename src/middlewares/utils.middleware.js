const { validationResult } = require('express-validator');
const Joi = require('joi'); 
const schema = require('../Validations/bookSchemas');


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

// exports.checkSchema = (req, res, next) =>{

//     var x= Joi.validate(schema.bookPost, req.body) 



//     return next();
// }

exports.checkSchema = (schema) => {
    return (req, res, next) =>{

        const { error } = schema.validate(req.body); 
        const valid = error == null; 
  
        if (valid) { 
            next(); 
        } else { 
            const { details } = error; 
            const message = details.map(i => i.message).join(',');
        
            console.log("error", message); 
            res.status(422).json({ error: message }) 
        } 
    } 
}
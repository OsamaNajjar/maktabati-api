const Joi = require('joi'); 
const bookSchemas = { 
  bookPost: Joi.object().keys({ 
    name: Joi.string()
        .min(3)
        .max(300)
        .required(),

    nameAr: Joi.string()
        .max(300),

    year: Joi.number()
        .integer()
        .min(1900)
        .required(),

    author: Joi.string()
        .required(),
    
    price: Joi.number()
        .required(),
    
    quantity: Joi.number()
    .required(),

    row: Joi.string()
    .required(),

    shelf: Joi.string()
    .required(),

    column: Joi.string()
    .required(),

    isbn: Joi.string()
    .required(),
    }), 
}; 
module.exports = bookSchemas;
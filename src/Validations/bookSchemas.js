const Joi = require('joi'); 
const bookSchemas = { 
  bookPost: Joi.object().keys({ 
    name: Joi.string()
        .min(3)
        .max(300)
        .required()
        .messages({'string.base':'Book Title should be a type Text',
                'string.min':'Book Title should have a minimum length of {#limit} characters',
                'string.max':'Book Title should have a maximum length of {#limit} characters',
                'any.required': 'Book Title is a Required ..!'}),

    nameAr: Joi.string()
        .min(3)
        .max(300)
        .messages({'string.base':'Book Arabic Title should be a type Text',
                'string.min':'Book Arabic Title should have a minimum length of {#limit} characters',
                'string.max':'Book Arabic Title should have a maximum length of {#limit} characters'}),

    year: Joi.number()
        .integer()
        .min(1900)
        .max(new Date().getFullYear())
        .required()
        .messages({'number.base':'book year should be a type Number',
                'number.min':'The book year is older than {#limit}',
                'number.max':'The book year is more recent than the current year {#limit}',
                'any.required': 'The year the book was written is a Required ..!'}),
    author: Joi.string()
        .required()
        .messages({'string.base':'Author should be a type Text',
                'any.required': 'Author is a Required ..!'}),
    
    price: Joi.number()
        .required()
        .messages({'number.base':'Price should be a type Number',
                'any.required': 'Price is a Required ..!'}),
    
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
const Joi = require('joi');

const bookValidationSchema = Joi.object({
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
})

module.exports = bookValidationSchema;
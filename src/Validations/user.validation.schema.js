const userValidationSchema = {
    name: {
        notEmpty:true,
        errorMessage: 'Name is wrong',
    }
};

module.exports = userValidationSchema;
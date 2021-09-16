const express = require('express');
const { checkSchema} = require('express-validator');
const userSchema = require('../Validations/user.validation.schema');
const {checkValidationResults} = require('../middlewares/utils.middleware');

const usersController = require('../controllers/users.controller');

const Router = express.Router();

// /users?{employeeId}&{email}&{name}&{lang=A} => GET
Router.get('/', usersController.getAllUsers);

// /users/{employeeId}?{employeeId}&{email}&{name}&{lang=A} => GET
Router.get('/:employeeId', usersController.getByEmployeeId);

// /users?{lang=A} => POST
Router.post('/', checkSchema(userSchema), checkValidationResults ,usersController.createUser);

Router.patch('/:employeeId', usersController.updateUser);

module.exports = Router;
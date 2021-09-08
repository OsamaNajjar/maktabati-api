const express = require('express');
const usersController = require('../controllers/users.controller');

const Router = express.Router();

// /users?{employeeId}&{email}&{name}&{lang=A} => GET
Router.get('/', usersController.getAllUsers);

// /users/{employeeId}?{employeeId}&{email}&{name}&{lang=A} => GET
Router.get('/:employeeId', usersController.getByEmployeeId);

// /users?{lang=A} => POST
Router.post('/', usersController.createUser);

Router.patch('/:employeeId', usersController.updateUser);

module.exports = Router;
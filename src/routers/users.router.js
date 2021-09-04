const express = require('express');
const usersController = require('../controllers/users.controller');

const Router = express.Router();

Router.get('/', usersController.getAllUsers);

module.exports = Router;
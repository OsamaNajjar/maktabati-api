const express = require('express');
const mapsController = require('../controllers/maps.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const {checkValidationResults} = require('../middlewares/utils.middleware');
const { queryMiddleware } = require('@abujude/sgs-khadamati');
const { check, query, body , param} = require('express-validator');

const Router = express.Router();

Router.get('/', mapsController.getAllMaps);

Router.get('/:mapId', mapsController.getMapByMapId);

Router.post('/', authMiddleware, mapsController.createMap);

module.exports = Router;
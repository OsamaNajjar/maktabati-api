const express = require('express');
const reportsController = require('../controllers/reports.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const Router = express.Router();

Router.get('/', reportsController.getAllReports);

Router.get('/:id', reportsController.getReportById);

module.exports = Router;

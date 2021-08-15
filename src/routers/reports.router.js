const express = require('express');
const reportsController = require('../controllers/reports.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const {checkValidationResults} = require('../middlewares/utils.middleware');
const { queryMiddleware } = require('@abujude/sgs-khadamati');
const { check, query, body , param} = require('express-validator');

const Router = express.Router();

Router.get('/', reportsController.getAllReports);

Router.get('/:reportId', reportsController.getReportByReportId);

Router.post('/', authMiddleware, reportsController.createReport);

module.exports = Router;

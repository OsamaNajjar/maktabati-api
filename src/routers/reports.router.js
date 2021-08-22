const express = require('express');
const reportsController = require('../controllers/reports.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const {checkValidationResults} = require('../middlewares/utils.middleware');
const { queryMiddleware } = require('@abujude/sgs-khadamati');
const { check, query, body , param} = require('express-validator');

const Router = express.Router();

const reportValidations = [
    body('name')
        .notEmpty()
    , body('year', 'Invalid year')
        .isInt({min: 1900, max: new Date().getFullYear()})
    , body('author')
        .notEmpty()
    , body('price', 'Invalid Price')
        .isDecimal({min: 0})
    , body('quantity', 'Invalid quantity')
        .isInt({min: 0})
    , body('row')
        .notEmpty()
    , body('shelf')
        .notEmpty()
]

Router.get('/'
    , queryMiddleware.split(['names'], ',')
    , query('year', 'Invalid Report year!')
        .optional({checkFalsy: true})           
        .isInt({min: 1900, max: new Date().getFullYear()})
    , checkValidationResults
    , reportsController.getAllReports);

Router.get('/:reportId', reportsController.getReportByReportId);

Router.post('/'
    , reportValidations
    , checkValidationResults
    , authMiddleware
    , reportsController.createReport);

Router.put('/:reportId'
    , reportValidations
    , checkValidationResults
    , authMiddleware
    , reportsController.updateReport);

Router.delete('/:reportId', authMiddleware, reportsController.deleteReport);

module.exports = Router;

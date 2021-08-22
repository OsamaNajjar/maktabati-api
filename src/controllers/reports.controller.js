const reportsManager = require('../managers/reports.manager');
const modelMapper = require('../models/model-mapper');

exports.getAllReports = async (req, res, next) => {

    try {

        const { names , author, reportId, reportType, abstract, fromYear, toYear} = req.query;

        const results = await reportsManager.getAllReports(names, author, reportId, reportType, abstract, fromYear, toYear);

        return res.json(results.map(report => modelMapper.mapToReportDTO(report.toJSON())));

    } catch (error) {
        error.httpStatusCode = error.httpStatusCode || 500;
        return next(error);
    }

};

exports.getReportByReportId = async (req, res, next) => {

    try {

        const reportId = req.params.reportId;

        const result = await reportsManager.getReportByReportId(reportId);
        
        if(!result) {
            const error = new Error();
            error.httpStatusCode = 404;
            throw error;
        }

        return res.json(modelMapper.mapToReportDTO(result.toJSON()));

    } catch (error) {
        error.httpStatusCode = error.httpStatusCode || 500;
        return next(error);
    }

};

exports.createReport = async (req, res, next) => {

    try {

        const reportDTO = req.body;

        if(!reportDTO) {
            const error = new Error('Report required!');
            error.httpSatutsCode = 401;
            throw error;
        }

        const result = await reportsManager.createReport(reportDTO);

        return res.status(201).json(modelMapper.mapToReportDTO(result.toJSON()));
          
    } catch(error) {
        error.httpStatusCode = error.httpStatusCode || 500;
        return next(error);
    }

}

exports.updateReport = async (req, res, next) => {

    try {

        const reportId = req.params.reportId;
        const reportDTO = req.body;

        if(!reportDTO) {
            const error = new Error('Report required!');
            error.httpSatutsCode = 401;
            throw error;
        }

        const reportModel = modelMapper.mapToReportModel(reportDTO);

        const result = await reportsManager.updateReport(reportId,reportModel);

        if(!result) {
            const error = new Error();
            error.httpStatusCode = 404;
            throw error;
        }

        return res.status(200).json(modelMapper.mapToReportDTO(result.toJSON()));

    } catch(error) {
        error.httpStatusCode = error.httpStatusCode || 500;
        return next(error);
    }
};

exports.deleteReport = async (req, res, next) => {
    try {

        const reportId = req.params.reportId;

        //Check if item exist.
        //Check for any borrows
        
        const result = await reportsManager.deleteReport(reportId);

        if(!result) {
            const error = new Error();
            error.httpStatusCode = 404;
            throw error;
        }

        return res.status(200).json();

    } catch(error) {
        error.httpStatusCode = error.httpStatusCode || 500;
        return next(error);
    }
};

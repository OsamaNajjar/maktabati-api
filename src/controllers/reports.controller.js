const reportsManager = require('../managers/reports.manager');

exports.getAllReports = async (req, res, next) => {

    try {

        const { names , author, reportId, reportType, fromYear, toYear} = req.query;

        const results = await reportsManager.getAllReports(names, author, reportId, reportType, fromYear, toYear);

        return res.json(results);

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

        return res.json(result);

    } catch (error) {
        error.httpStatusCode = error.httpStatusCode || 500;
        return next(error);
    }

};

exports.createReport = async (req, res, next) => {

    try {

        const reportDTO = req.body;

        const result = await reportsManager.createReport(reportDTO);

        return res.status(201).json(result);
          
    } catch(error) {
        error.httpStatusCode = error.httpStatusCode || 500;
        return next(error);
    }

}
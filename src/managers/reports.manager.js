const { Op } = require('sequelize');

const Item = require('../database/models/Item.model');
const Report = require('../database/models/report.model');
const modelMapper = require('../models/model-mapper');

exports.getAllReports = async (names, author, reportId,  reportType, fromYear, toYear ) => {

    try {

        //Setup conditions
        let whereClause = {};

        if(names && names.length > 0) {
            whereClause['name'] = names;
        }
        if(author) {
            whereClause['author'] = {[Op.substring]: author};
        }
        if(reportId) {
            whereClause['$Report.reportId$'] = {[Op.substring]: reportId};
        }
        if(reportType) {
            whereClause['$Report.reportType$'] = {[Op.substring]: reportType};
        }
        if(fromYear) {
            whereClause['year'] = {[Op.gte]: fromYear};
        }
        if(toYear) {
            whereClause['year'] = {[Op.lte]: toYear};
        }

        const items = await Item.findAll({
            where: whereClause
            , include: {
                model: Report
                , required: true
            }
        });

        return items.map(report => modelMapper.mapToReportDTO(report.toJSON()));

    } catch(error) {
        throw error;
    }

}

exports.getReportByReportId = async (reportId) => {

    try {

        const reportItem = await Item.findOne({
            include: {
                model: Report
                , where: {
                    reportId: reportId
                }
            }
        });

        if(!reportItem) {
            return undefined;
        }

        return modelMapper.mapToReportDTO(reportItem.toJSON());

    } catch(error) {
        throw error;
    }

}

exports.createReport = async (reportDTO) => {

    try {
        
        if(!reportDTO) {
            const error = new Error('Report required!');
            error.httpSatutsCode = 401;
            throw error;
        }

        const reportModel = modelMapper.mapToReportModel(reportDTO);

        const result = await Item.create(reportModel, {
            include: [Report] 
        });

        return modelMapper.mapToReportDTO(result.toJSON());

    } catch(error) {
        throw error;
    }
}
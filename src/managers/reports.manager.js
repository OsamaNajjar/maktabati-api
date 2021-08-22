const { Op } = require('sequelize');

const Item = require('../database/models/Item.model');
const Report = require('../database/models/report.model');
const modelMapper = require('../models/model-mapper');

exports.getAllReports = async (names, author, reportId, reportType, abstract, fromYear, toYear ) => {

    try {

        //Setup conditions
        let whereClause = {};

        whereClause['itemType'] = 'Report';

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
        if(abstract) {
            whereClause['abstract'] = {[Op.substring]: abstract};
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

        return items;

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

        return reportItem;

    } catch(error) {
        throw error;
    }

}

exports.createReport = async (reportDTO) => {

    try {
        
        if(!reportDTO) {
            const error = new Error('Report required!');
            throw error;
        }

        const reportModel = modelMapper.mapToReportModel(reportDTO);

        const result = await Item.create(reportModel, {
            include: [Report] 
        });
        
        return result;

    } catch(error) {
        throw error;
    }
}

exports.updateReport = async (reportId,reportModel) => {

    if(!reportModel) {
        const error = new Error('Report required!');
        throw error;
    }

    try {

        const currentReportItem = await this.getReportByReportId(reportId);

        if(!currentReportItem) {
            return undefined;
        } 

        await sequelize.transaction(async (t) => {

            await Item.update({...reportModel}
                , {where: {id: currentReportItem.id}
                    , transaction: t});
        
            await currentReportItem.Report.update({
                reportId: reportModel.Report.reportId
            },  { transaction: t });
        
            return;
        
        });

        return await this.getReportByReportId(reportModel.Report.reportId);

    } catch(error) {
        throw error;
    }

}

exports.deleteReport = async (reportId) => {

    try {

        const ReportItem = await this.getReportByReportId(reportId);

        if(!ReportItem) {
            return undefined;
        } 

        await sequelize.transaction(async (t) => {

            await ReportItem.Report.destroy({
                             reportId: reportId
                        },  { transaction: t });

            await Item.destroy(
                {where: {id: ReportItem.id}
                    , transaction: t});
        
            return;
            
        });

        return true;

    } catch(error) {
        throw error;
    }

}
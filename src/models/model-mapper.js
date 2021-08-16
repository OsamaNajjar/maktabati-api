const BookDTO = require('./book.dto');
const ReportDTO = require('./report.dto');
const MapDTO = require('./map.dto');

const BookModel = require('../database/models/book.model');
const ReportModel = require('../database/models/report.model');
const MapModel = require('../database/models/map.model');

//Books
exports.mapToBookDTO = (bookModel) => {

    const bookDTO = {...bookModel, isbn: bookModel.Book.isbn};

    [
        'id'
      , 'Book'
      , 'itemType'
      , 'updatedAt'
      , 'createdAt'
    ].forEach(key => delete bookDTO[key]);

    bookDTO.key = bookDTO.name + bookDTO.year;

    return bookDTO;
}

exports.mapToBookModel = (bookDTO) => {
 
    const bookModel = { ...bookDTO,itemType: 'Book'  , Book: { isbn: bookDTO.isbn } };
    delete bookModel.isbn;

    return bookModel;
}

//Reports
exports.mapToReportDTO = (reportModel) => {

    const reportDTO = {...reportModel, reportId: reportModel.Report.reportId
        ,reportType: reportModel.Report.reportType
        ,region: reportModel.Report.region
        ,attachments: reportModel.Report.attachments
        ,abstract: reportModel.Report.abstract
        ,status: reportModel.Report.status};

    [
        'id'
      , 'Report'
      , 'itemType'
      , 'updatedAt'
      , 'createdAt'
    ].forEach(key => delete reportDTO[key]);

    reportDTO.key = reportDTO.name + reportDTO.year;

    return reportDTO;
}

exports.mapToReportModel = (reportDTO) => {
 
    const reportModel = { ...reportDTO, itemType: 'Report' , Report: { reportId: reportDTO.reportId 
        ,reportType: reportDTO.reportType
        ,region: reportDTO.region
        ,attachments: reportDTO.attachments
        ,abstract: reportDTO.abstract
        ,status: reportDTO.status} };
        
    delete reportModel.reportId;
    delete reportModel.reportType;
    delete reportModel.region;
    delete reportModel.attachments;
    delete reportModel.abstract;
    delete reportModel.status;

    return reportModel;
}

//Maps
exports.mapToMapDTO = (mapModel) => {

    const mapDTO = {...mapModel, mapId: mapModel.Map.mapId
        ,mapType: mapModel.Map.mapType
        ,size: mapModel.Map.size
        ,region: mapModel.Map.region
        ,attachments: mapModel.Map.attachments
        ,abstract: mapModel.Map.abstract
        ,status: mapModel.Map.status};

    [
        'id'
      , 'Map'
      , 'itemType'
      , 'updatedAt'
      , 'createdAt'
    ].forEach(key => delete mapDTO[key]);

    mapDTO.key = mapDTO.name + mapDTO.year;

    return mapDTO;
}

exports.mapToMapModel = (mapDTO) => {
 
    const mapModel = { ...mapDTO, itemType: 'Map' , Map: { mapId: mapDTO.mapId 
        ,mapType: mapDTO.mapType
        ,size: mapDTO.size
        ,region: mapDTO.region
        ,attachments: mapDTO.attachments
        ,abstract: mapDTO.abstract
        ,status: mapDTO.status} };
        
    delete mapModel.mapId;
    delete mapModel.mapType;
    delete mapModel.size;
    delete mapModel.region;
    delete mapModel.attachments;
    delete mapModel.abstract;
    delete mapModel.status;

    return mapModel;
}
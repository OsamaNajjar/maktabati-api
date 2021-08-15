const BookDTO = require('./book.dto');
const ReportDTO = require('./report.dto');

const BookModel = require('../database/models/book.model');
const ReportModel = require('../database/models/report.model');

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
 
    const bookModel = { ...bookDTO , Book: { isbn: bookDTO.isbn } };
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
 
    const reportModel = { ...reportDTO , Report: { reportId: reportDTO.reportId 
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

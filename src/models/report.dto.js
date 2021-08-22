module.exports = class ReportDTO {

    constructor(id, name, nameAr, author, reportId, reportType, region, year, price, quantity, attachments, abstract, note, row, shelf, column, status) {
        this.id = id;
        this.name = name;
        this.nameAr = nameAr;
        this.author = author;
        this.reportId  = reportId;
        this.reportType = reportType;
        this.region = region;
        this.year = year;
        this.price = price;
        this.quantity = quantity;
        this,attachments = attachments;
        this.abstract = abstract;
        this,note = note;
        this.row = row;
        this.shelf = shelf;
        this.column = column;
        this.status = status
    }

}
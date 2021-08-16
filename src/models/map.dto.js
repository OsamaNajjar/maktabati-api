module.exports = class MapDTO {

    constructor(id, name, nameEn, author, mapId, mapType, region, year, price, quantity, attachments, abstract, note, row, shelf, column, status) {
        this.id = id;
        this.name = name;
        this.nameEn = nameEn;
        this.author = author;
        this.mapId  = mapId;
        this.mapType = mapType;
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
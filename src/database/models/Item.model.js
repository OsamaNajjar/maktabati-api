const Sequelize = require('sequelize');
const sequelize = require('../db-client');

const book = require('./book.model');
const map = require('./map.model');
const borrow = require('./borrow.model');
const report = require('./report.model');

class Item extends Sequelize.Model {

}

const item = Item.init({
    id: {
        type: Sequelize.INTEGER
        , allowNull: false
        , autoIncrement: true
        , primaryKey: true
    }
    , name: {
        type: Sequelize.STRING(300)
        , allowNull: false
        // , unique: 'uniqueName'
        , validate: {
            notEmpty: true
        }
    }
    , nameEng: {
        type: Sequelize.STRING(300)
    }
    , year: {
        type: Sequelize.INTEGER
        , allowNull: false
        // , unique: 'uniqueName'
        , validate: {
            min: { args: 1900 , msg: 'year can not be before 1900'}
        }
    }
    , author: {
        type: Sequelize.STRING
        , allowNull: false
        , comment: 'This is a column name that has a comment'
        , validate: {
            notEmpty: true
        }
    }
    , price: {
        type: Sequelize.DECIMAL
        , allowNull: false
        , validate: {
            min: 0
        }
    }
    , quantity: {
        type: Sequelize.INTEGER
        , allowNull: false
        , defaultValue: 1
        , validate: {
            min: 0
        }
    }
    , row: {
        type: Sequelize.STRING(10)
        , allowNull: false
        , validate: {
            notEmpty: true
        }
    }
    , shelf: {
        type: Sequelize.STRING(10)
        , allowNull: false
        , validate: {
            notEmpty: true
        }
    }
    , column: {
        type: Sequelize.STRING(10)
        , allowNull: true
    }
    ,itemType: {
        type: Sequelize.ENUM
        , values: [
            'Book'
            , 'Report'
            , 'Map'
        ]
        , defaultValue: 'Book'
        , allowNull: false
        , validate: {
            notEmpty: {
                msg: 'Invalid Item type'
            }
        }
    }
    , note: Sequelize.TEXT
}, {
    sequelize
    , timestamps:true
    , indexes: [{unique: true, fields: ['name', 'year']}]
});


item.hasOne(book, {
    foreignKey: 'itemId'
    , onUpdate: 'CASCADE' 
    , onDelete: 'CASCADE'
});

book.belongsTo(item, {
    foreignKey: 'itemId'
    , onUpdate: 'CASCADE' 
    , onDelete: 'CASCADE'
});

item.hasOne(map, {
    foreignKey: 'itemId'
    , onUpdate: 'CASCADE' 
    , onDelete: 'CASCADE'
});

map.belongsTo(item, {
    foreignKey: 'itemId'
    , onUpdate: 'CASCADE' 
    , onDelete: 'CASCADE'
});

item.hasMany(borrow, {
    foreignKey: 'itemId'
    , onUpdate: 'CASCADE' 
    , onDelete: 'CASCADE'
});

borrow.belongsTo(item, {
    foreignKey: 'itemId'
    , onUpdate: 'CASCADE' 
    , onDelete: 'CASCADE'
});

item.hasOne(report, {
    foreignKey: 'itemId'
    , onUpdate: 'CASCADE' 
    , onDelete: 'CASCADE'
});

report.belongsTo(item, {
    foreignKey: 'itemId'
    , onUpdate: 'CASCADE' 
    , onDelete: 'CASCADE'
});



module.exports = item;


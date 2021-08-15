const Sequelize = require('sequelize');
const sequelize = require('../db-client');

class Report extends Sequelize.Model {

}

module.exports = Report.init({
    
    id: {
        type: Sequelize.INTEGER
        , allowNull: false
        , autoIncrement: true
        , primaryKey: true
    }
    , reportId: {
        type: Sequelize.STRING(30)
        , allowNull: false
        , validate: {
            notEmpty: true
        }
    }
    , reportType: {
        type: Sequelize.STRING(30)
        , allowNull: false
        , validate: {
            notEmpty: true
        }
    }
    , region: {
        type: Sequelize.STRING(100)
        , allowNull: true
    }
    , attachments: {
        type: Sequelize.BOOLEAN
        , allowNull: false
        , validate: {
            notEmpty: true
        }
    }
    , abstract: {
        type: Sequelize.TEXT
        , allowNull: true
    }
    , status: {
        type: Sequelize.STRING(20)
        , allowNull: true
    }
    , itemId: {
        type: Sequelize.INTEGER
        , allowNull: false
    }

}, {
    sequelize,
    updatedAt: false
})

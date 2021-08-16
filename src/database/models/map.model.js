const Sequelize = require('sequelize');
const sequelize = require('../db-client');


class Map extends Sequelize.Model {

}

module.exports =  Map.init({

    id: {
        type: Sequelize.INTEGER
        , allowNull: false
        , autoIncrement: true
        , primaryKey: true
    }
    , size: {
        type: Sequelize.STRING(20)
        , allowNull: false
        , validate: {
            notEmpty: true
        }
    }
    , mapId: {
        type: Sequelize.STRING(30)
        , allowNull: false
        , validate: {
            notEmpty: true
        }
    }
    , mapType: {
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
    createdAt: false
});
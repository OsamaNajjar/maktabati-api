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
    , Size: {
        type: Sequelize.STRING(20)
        , allowNull: false
        , validate: {
            notEmpty: true
        }
    }
    , itemId: {
        type: Sequelize.INTEGER
        , allowNull: false
    }
}, {
    sequelize,
    createdAt: false
});
const Sequelize = require('sequelize');
const sequelize = require('../db-client');

class Book extends Sequelize.Model {

}

module.exports = Book.init({
    
    id: {
        type: Sequelize.INTEGER
        , allowNull: false
        , autoIncrement: true
        , primaryKey: true
    }
    , isbn: {
        type: Sequelize.STRING(50)
        , allowNull: false
        , validate: {
            notEmpty: true
        }
        , unique: true
    }
    , itemId: {
        type: Sequelize.INTEGER
        , allowNull: false
    }

}, {
    sequelize,
    updatedAt: false
});


const Sequelize = require('sequelize');
const sequelize = require('../db-client');


class Borrow extends Sequelize.Model {

    get Returned() {
        if(this.returnDate) {
            return true;
        }
        return false;
    }

}

module.exports =  Borrow.init({

    id: {
        type: Sequelize.INTEGER
        , allowNull: false
        , autoIncrement: true
        , primaryKey: true
    }
    , date: {
        type: Sequelize.DATE
        , allowNull: false
        , defaultValue: Sequelize.NOW
    }
    , employeeId: {
        type: Sequelize.INTEGER
        , allowNull: false
        , validate: {
            min: { args: [1], msg: 'Invalid employee id!' }
        }
    } 
    , returnDate: {
        type: Sequelize.DATE
        , allowNull: true
        , validate: {
            isValidReturnDate(value) {
                if(value < this.date) {
                    throw new Error('Return date must be after borrow date!');
                }
            }
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
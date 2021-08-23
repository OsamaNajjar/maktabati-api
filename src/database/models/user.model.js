const Sequelize = require('sequelize');
const sequelize = require('../db-client');

class User extends Sequelize.Model {

}

module.exports = User.init({
    id: {
        type: Sequelize.INTEGER
        , allowNull: false
        , autoIncrement: true
        , primaryKey: true
    }
    , employeeId: {
        type: Sequelize.INTEGER
        , allowNull: false
        , unique: {args: 'employeeId' , msg: 'employee id already exist!'}
        , validate: {
            notEmpty: true
        }
    }
    , name: {
        type: Sequelize.STRING(100)
        , allowNull: false
        , validate: {
            notEmpty: true
        }
    }
    , email: {
        type: Sequelize.STRING(80)
        , allowNull: false
        , unique: {args: 'email' , msg: 'Email already exist!'}
        , validate: {
            notEmpty: true
            , isEmail: true
        }
    }
    // , hashedPassword: {
    //   type: DataTypes.STRING(64),
    //   is: /^[0-9a-f]{64}$/i
    // }
    , password: {
        type: Sequelize.STRING
        , allowNull: false
    }
}, {
    sequelize
    , timestamps: true
});
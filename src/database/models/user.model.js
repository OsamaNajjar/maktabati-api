const Sequelize = require('sequelize');
const sequelize = require('../db-client');
const bcrypt = require('bcryptjs');
const { create } = require('./book.model');

class User extends Sequelize.Model {

    static saveUser() {
        console.log('ok');
        return true;
    }
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
    , password: {
      type: Sequelize.STRING(64),
      is: /^[0-9a-f]{64}$/i
    }
}, {
    sequelize
    , timestamps: true
});

User.beforeSave(async (user, options) => {
    if(user.changed('password')){
        console.log(user.password);
        user.password = await bcrypt.hash(user.password, 8);
    }
});
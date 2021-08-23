const { Op } = require('sequelize');

const User = require('../database/models/user.model');
const modelMapper = require('../models/model-mapper');
const sequelize = require('../database/db-client');

exports.getAllUsers = async ({employeeId, email, name}) => {

    try {

        //Setup conditions
        let whereClause = {};

        if(employeeId) {
            whereClause['employeeId'] = employeeId ;
        }
        if(email) {
            whereClause['email'] = {[Op.substring]: email};
        }
        if(author) {
            whereClause['name'] = {[Op.substring]: name};
        }

        const users = await User.findAll({
            where: whereClause})

        return users

    } catch(error) {
        throw error;
    }

}
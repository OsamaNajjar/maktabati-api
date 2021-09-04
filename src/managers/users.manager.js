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
        if(name) {
            whereClause['name'] = {[Op.substring]: name};
        }

        const users = await User.findAll({
            where: whereClause})

        return users

    } catch(error) {
        throw error;
    }

}

exports.getUserByEmail = async (email) => {

    try {

        const currentUser = await Item.findOne({email: email});

        if(!currentUser) {
            return undefined;
        }

        return currentUser;

    } catch(error) {
        throw error;
    }

}

exports.createUser = async (userModel) => {

    try {
        
        if(!userModel) {
            const error = new Error('User required!');
            throw error;
        }

        const result = await User.create(userModel);

        return result;

    } catch(error) {
        throw error;
    }

}

exports.updateUser = async (email,userModel) => {

    if(!userModel) {
        const error = new Error('User required!');
        throw error;
    }

    try {

        const currentUser = await this.getUserByEmail({email: email});

        if(!currentUser) {
            return undefined;
        } 

       const result = await User.update(userModel
            , {where: {id: currentUser.id}});

        return result;

    } catch(error) {
        throw error;
    }

}

exports.deleteUser = async (email) => {

    try {

        const currentUser = await this.getUserByEmail(email);

        if(!currentUser) {
            return undefined;
        } 

        await currentUser.destroy({email: email});

        return true;

    } catch(error) {
        throw error;
    }

}
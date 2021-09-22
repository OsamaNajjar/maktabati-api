const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

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

exports.getByEmployeeId = async (employeeId) => {

    try {

        const currentUser = await User.findOne({employeeId: employeeId});

        if(!currentUser) {
            return undefined;
        }

        return currentUser;

    } catch(error) {
        throw error;
    }

}

exports.getUserByEmail = async (email) => {

    try {

        const user = await User.findOne({email: email});

        if(!user) {
            return undefined;
        }

        return user;

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

exports.findByCredentials = async (email, password) => {
    try {

        const user = await this.getUserByEmail(email);

        if(!user) {
            throw new error('Unable to login!');
        }

        const isMatch = await bcrypt.compare(user.hashedPassword, password);
        if(!isMatch) {
            throw new error('Unable to login!');
        }

        return user;
    } catch(error) {
        throw error;
    }
}

exports.updateUser = async (employeeId, userModel) => {

    try {

        if(!userModel) {
            const error = new Error('User required!');
            throw error;
        }

        const updates = Object.keys(userModel);
        const allowedUpdates = ['name', 'email', 'password'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

        if(!isValidOperation) {
            const error = new Error('Change not allowed');
            throw error;
        }

        const currentUser = await this.getByEmployeeId({employeeId: employeeId});

        if(!currentUser) {
            return undefined;
        }

        updates.forEach(update => currentUser[update] = userModel[update]);

        const result = await currentUser.save();

        // console.log(result);

    //    const result = await User.update(userModel
    //         , {where: {id: currentUser.id}});

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
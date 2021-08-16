const { Op } = require('sequelize');

const Item = require('../database/models/Item.model');
const Map = require('../database/models/map.model');
const modelMapper = require('../models/model-mapper');


exports.getAllMaps = async (names, author, size, mapId,  mapType, fromYear, toYear ) => {

    try {

        //Setup conditions
        let whereClause = {};

        if(names && names.length > 0) {
            whereClause['name'] = names;
        }
        if(author) {
            whereClause['author'] = {[Op.substring]: author};
        }
        if(size) {
            whereClause['size'] = {[Op.substring]: size};
        }
        if(mapId) {
            whereClause['$Map.mapId$'] = {[Op.substring]: mapId};
        }
        if(mapType) {
            whereClause['$Map.mapType$'] = {[Op.substring]: mapType};
        }
        if(fromYear) {
            whereClause['year'] = {[Op.gte]: fromYear};
        }
        if(toYear) {
            whereClause['year'] = {[Op.lte]: toYear};
        }

        const items = await Item.findAll({
            where: whereClause
            , include: {
                model: Map
                , required: true
            }
        });

        return items;

    } catch(error) {
        throw error;
    }

}

exports.getMapByMapId = async (mapId) => {

    try {

        const mapItem = await Item.findOne({
            include: {
                model: Map
                , where: {
                    mapId: mapId
                }
            }
        });

        if(!mapItem) {
            return undefined;
        }

        return mapItem;

    } catch(error) {
        throw error;
    }

}

exports.createMap = async (mapDTO) => {

    try {
        
        if(!mapDTO) {
            const error = new Error('Map required!');
            error.httpSatutsCode = 401;
            throw error;
        }

        const mapModel = modelMapper.mapToMapModel(mapDTO);

        const result = await Item.create(mapModel, {
            include: [Map] 
        });
        
        return result;

    } catch(error) {
        throw error;
    }
}
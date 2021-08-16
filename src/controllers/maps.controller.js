const mapsManager = require('../managers/maps.manager');
const modelMapper = require('../models/model-mapper');

exports.getAllMaps = async (req, res, next) => {

    try {
        const { names , author, size, mapId, mapType, fromYear, toYear} = req.query;

        const results = await mapsManager.getAllMaps(names, author, size, mapId, mapType, fromYear, toYear);

        return res.json(results.map(map => modelMapper.mapToMapDTO(map.toJSON())));

    } catch (error) {
        error.httpStatusCode = error.httpStatusCode || 500;
        return next(error);
    }
};

exports.getMapByMapId = async (req, res, next) => {

    try {

        const mapId = req.params.mapId;

        const result = await mapsManager.getMapByMapId(mapId);
        
        if(!result) {
            const error = new Error();
            error.httpStatusCode = 404;
            throw error;
        }

        return res.json(modelMapper.mapToMapDTO(result.toJSON()));

    } catch (error) {
        error.httpStatusCode = error.httpStatusCode || 500;
        return next(error);
    }

};

exports.createMap = async (req, res, next) => {

    try {

        const mapDTO = req.body;

        if(!mapDTO) {
            const error = new Error('Map required!');
            error.httpSatutsCode = 401;
            throw error;
        }

        const result = await mapsManager.createMap(mapDTO);

        return res.status(201).json(modelMapper.mapToMapDTO(result.toJSON()));
          
    } catch(error) {
        error.httpStatusCode = error.httpStatusCode || 500;
        return next(error);
    }

}
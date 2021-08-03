
const langMiddleware = (req, res, next) => {

    req.lang = (req.query.lang || 'A').toUpperCase();

    next();

}

module.exports = langMiddleware ;
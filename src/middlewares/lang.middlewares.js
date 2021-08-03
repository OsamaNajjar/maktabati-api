
const langMiddleware = (req, res, next) => {

    req.lang = req.query.lang.toUpperCase() || 'A';

    console.log(req.lang);

    next();

}

module.exports = langMiddleware ;
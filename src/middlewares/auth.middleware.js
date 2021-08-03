
module.exports = (req, res, next) => {

    req.user = { id: 1143 }

    next();

}
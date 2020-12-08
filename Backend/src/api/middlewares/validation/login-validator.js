var validator = require("validator");

module.exports = (req, res, next) => {
    if (!req.body.username || !req.body.password)
        res.send(404);
    else
        next();
}
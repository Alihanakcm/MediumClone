var validator = require("validator");

module.exports = (req, res, next) => {
    if (validator.isEmail(req.body.email))
        next();
    else
        res.send({res:"email is not valid"});
}
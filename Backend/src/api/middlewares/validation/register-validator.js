var validator = require("validator");

module.exports = (request, response, next) => {
    if (validator.isEmail(request.body.email))
        next();
    else
        response.send("email is not valid")
}